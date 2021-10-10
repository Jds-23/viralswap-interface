import { useState, useMemo, useCallback, useEffect } from 'react'
import { isMobile, isIOS } from 'react-device-detect'
import { useLingui } from '@lingui/react'
import { ChainId, Currency, CurrencyAmount, JSBI, Token, TradeType, Trade as V2Trade } from '@sushiswap/sdk'
import { useActiveWeb3React } from '../../../hooks/useActiveWeb3React'
import TokenWarningModal from '../../../modals/TokenWarningModal'
import Lottie from 'lottie-react'

import ReactGA from 'react-ga'

import SwapHeader from '../../SwapHeader'
import { ApprovalState, useApproveCallbackFromTrade } from '../../../hooks/useApproveCallback'

import useENSAddress from '../../../hooks/useENSAddress'
import useWrapCallback, { WrapType } from '../../../hooks/useWrapCallback'

import {
  useExpertModeManager,
  useUserArcherETHTip,
  useUserArcherGasPrice,
  useUserArcherUseRelay,
  useUserSingleHopOnly,
  useUserSlippageTolerance,
  useUserTransactionTTL,
} from '../../../state/user/hooks'
import { useAllTokens, useCurrency } from '../../../hooks/Tokens'
import ModalHeader from '../../../components/ModalHeader'
import Modal from '../../../components/Modal'
import DoubleGlowShadow from '../../../components/DoubleGlowShadow'
// import SwapHeader from '../../../components/ExchangeHeader'
import { Field } from '../../../state/swap/actions'
import ConfirmSwapModal from '../../../features/exchange-v1/swap/ConfirmSwapModal'
import { maxAmountSpend } from '../../../functions/currency'
import { useSwapCallback } from '../../../hooks/useSwapCallback'
import { useUSDCValue } from '../../../hooks/useUSDCPrice'
import { computeFiatValuePriceImpact } from '../../../functions/trade'
import confirmPriceImpactWithoutFee from '../../../features/exchange-v1/swap/confirmPriceImpactWithoutFee'
import CurrencyInputPanel from '../../../components/CurrencyInputPanel'
import Column, { AutoColumn } from '../../../components/Column'
import { classNames } from '../../../functions'
import swapArrowsAnimationData from '../../../animation/swap-arrows.json'
import Button from '../../../components/Button'
import TradePrice from '../../../features/exchange-v1/swap/TradePrice'
import { ButtonConfirmed, ButtonError } from '../../../components/Button'
import AddressInputPanel from '../../../components/AddressInputPanel'
import Alert from '../../../components/Alert'
import { ArrowWrapper, BottomGrouping, SwapCallbackError } from '../../../features/exchange-v1/swap/styleds'
import Web3Connect from '../../../components/Web3Connect'
import useIsArgentWallet from '../../../hooks/useIsArgentWallet'
import { warningSeverity } from '../../../functions/prices'
import Loader from '../../../components/Loader'
import ProgressSteps from '../../../components/ProgressSteps'
import UnsupportedCurrencyFooter from '../../../features/exchange-v1/swap/UnsupportedCurrencyFooter'
import Tooltip from '../../../components/Tooltip'
import QuestionHelper from '../../../components/QuestionHelper'

import {
  //   updateCoinValue,
  //   updateGasPrices,
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../../state/swap/hooks'

const SwapSection = () => {
  const { i18n } = useLingui()
  const { account, chainId, library } = useActiveWeb3React()
  const [networkGuideShow, setNetworkGuideShow] = useState<boolean>(false)

  const [animateSwapArrows, setAnimateSwapArrows] = useState<boolean>(false)

  const [showInverted, setShowInverted] = useState<boolean>(false)
  const isArgentWallet = useIsArgentWallet()

  const [isExpertMode] = useExpertModeManager()
  const [ttl] = useUserTransactionTTL()
  const [archerETHTip] = useUserArcherETHTip()

  const doArcher = undefined
  const { independentField, typedValue, recipient } = useSwapState()

  const {
    v2Trade,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError,
    allowedSlippage,
  } = useDerivedSwapInfo(doArcher)

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)

  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const { address: recipientAddress } = useENSAddress(recipient)
  const trade = showWrap ? undefined : v2Trade

  const parsedAmounts = useMemo(
    () =>
      showWrap
        ? {
            [Field.INPUT]: parsedAmount,
            [Field.OUTPUT]: parsedAmount,
          }
        : {
            [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
            [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
          },
    [independentField, parsedAmount, showWrap, trade]
  )

  const fiatValueInput = useUSDCValue(parsedAmounts[Field.INPUT])
  const fiatValueOutput = useUSDCValue(parsedAmounts[Field.OUTPUT])
  const priceImpact = computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput)

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()

  const isValid = !swapInputError

  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput]
  )

  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput]
  )

  const loadedUrlParams = useDefaultsFromURLSearch()

  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    showConfirm: boolean
    tradeToConfirm: V2Trade<Currency, Currency, TradeType> | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  )

  const routeNotFound = !trade?.route

  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)
  const [approvalState, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage, doArcher)

  const handleApprove = useCallback(async () => {
    await approveCallback()
    // if (signatureState === UseERC20PermitState.NOT_SIGNED && gatherPermitSignature) {
    //   try {
    //     await gatherPermitSignature()
    //   } catch (error) {
    //     // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
    //     if (error?.code !== 4001) {
    //       await approveCallback()
    //     }
    //   }
    // } else {
    //   await approveCallback()
    // }
  }, [approveCallback])

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approvalState, approvalSubmitted])

  const maxInputAmount: CurrencyAmount<Currency> | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const showMaxButton = Boolean(maxInputAmount?.greaterThan(0) && !parsedAmounts[Field.INPUT]?.equalTo(maxInputAmount))
  const signatureData = undefined

  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    trade,
    allowedSlippage,
    recipient,
    signatureData,
    doArcher ? ttl : undefined
  )

  const [singleHopOnly] = useUserSingleHopOnly()
  const handleSwap = useCallback(() => {
    if (!swapCallback) {
      return
    }
    if (priceImpact && !confirmPriceImpactWithoutFee(priceImpact)) {
      return
    }
    setSwapState({
      attemptingTxn: true,
      tradeToConfirm,
      showConfirm,
      swapErrorMessage: undefined,
      txHash: undefined,
    })
    swapCallback()
      .then((hash) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: undefined,
          txHash: hash,
        })

        ReactGA.event({
          category: 'Swap',
          action:
            recipient === null
              ? 'Swap w/o Send'
              : (recipientAddress ?? recipient) === account
              ? 'Swap w/o Send + recipient'
              : 'Swap w/ Send',
          label: [
            trade?.inputAmount?.currency?.symbol,
            trade?.outputAmount?.currency?.symbol,
            singleHopOnly ? 'SH' : 'MH',
          ].join('/'),
        })

        ReactGA.event({
          category: 'Routing',
          action: singleHopOnly ? 'Swap with multihop disabled' : 'Swap with multihop enabled',
        })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [
    swapCallback,
    priceImpact,
    tradeToConfirm,
    showConfirm,
    recipient,
    recipientAddress,
    account,
    trade?.inputAmount?.currency?.symbol,
    trade?.outputAmount?.currency?.symbol,
    singleHopOnly,
  ])

  const priceImpactSeverity = useMemo(() => {
    const executionPriceImpact = trade?.priceImpact
    return warningSeverity(
      executionPriceImpact && priceImpact
        ? executionPriceImpact.greaterThan(priceImpact)
          ? executionPriceImpact
          : priceImpact
        : executionPriceImpact ?? priceImpact
    )
  }, [priceImpact, trade])

  const showApproveFlow =
    !isArgentWallet &&
    !swapInputError &&
    (approvalState === ApprovalState.NOT_APPROVED ||
      approvalState === ApprovalState.PENDING ||
      (approvalSubmitted && approvalState === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({
      showConfirm: false,
      tradeToConfirm,
      attemptingTxn,
      swapErrorMessage,
      txHash,
    })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({
      tradeToConfirm: trade,
      swapErrorMessage,
      txHash,
      attemptingTxn,
      showConfirm,
    })
  }, [attemptingTxn, showConfirm, swapErrorMessage, trade, txHash])
  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]
  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency]
  )
  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
  }, [])

  const defaultTokens = useAllTokens()
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !Boolean(token.address in defaultTokens)
    })

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
    },
    [onCurrencySelection]
  )

  const handleMaxInput = useCallback(() => {
    maxInputAmount && onUserInput(Field.INPUT, maxInputAmount.toExact())
  }, [maxInputAmount, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => onCurrencySelection(Field.OUTPUT, outputCurrency),
    [onCurrencySelection]
  )

  return (
    <section id="buy" className="heroAccountSection">
      <div className="relative flex-col items-center justify-center md:flex" style={{ marginTop: '7rem' }}>
        <div className={isMobile ? 'heroAccountMobileDiv1' : 'heroAccountDiv1'}>
          <h2 className={isMobile ? 'viralMobileSectionH2' : 'viralSectionH2'}>Buy Now</h2>
          <div className="mb-10 align-center">
            <div className="flex justify-center">
              <p>Available On:</p>
            </div>
            <div className="flex justify-center">
              <div className="heroAvailableDiv">
                <QuestionHelper text={i18n._(`Ethereum (ETH)`)}>
                  <button
                    onClick={() => {
                      const params = {
                        chainId: '0x1',
                        chainName: 'Ethereum',
                        nativeCurrency: {
                          name: 'Ethereum',
                          symbol: 'ETH',
                          decimals: 18,
                        },
                        rpcUrls: ['https://mainnet.infura.io/v3/949ae8da62964d9682469cb45b745b12'],
                        blockExplorerUrls: ['https://etherscan.com'],
                      }
                      if (isMobile) {
                        {
                          chainId && chainId != ChainId.MAINNET && setNetworkGuideShow(true)
                        }
                      } else {
                        library?.send('wallet_switchEthereumChain', [{ chainId: '0x1' }, account])
                      }
                    }}
                  >
                    <img src="/images/viral/eth.png" alt="" />
                  </button>
                </QuestionHelper>
              </div>
              <div className="heroAvailableDiv">
                <QuestionHelper text={i18n._(`Polygon (Matic)`)}>
                  <button
                    onClick={() => {
                      const params = {
                        chainId: '0x89',
                        chainName: 'Matic',
                        nativeCurrency: {
                          name: 'Matic',
                          symbol: 'MATIC',
                          decimals: 18,
                        },
                        rpcUrls: [
                          //'https://matic-mainnet.chainstacklabs.com/'
                          'https://rpc-mainnet.maticvigil.com',
                        ],
                        blockExplorerUrls: ['https://explorer-mainnet.maticvigil.com'],
                      }
                      library?.send('wallet_addEthereumChain', [params, account])
                    }}
                  >
                    <img src="/images/viral/matic.png" alt="" />
                  </button>
                </QuestionHelper>
              </div>
              <div className="heroAvailableDiv">
                <QuestionHelper text={i18n._(`Binance Smart Chain (BNB)`)}>
                  <button
                    onClick={() => {
                      const params = {
                        chainId: '0x38',
                        chainName: 'Binance Smart Chain',
                        nativeCurrency: {
                          name: 'Binance Coin',
                          symbol: 'BNB',
                          decimals: 18,
                        },
                        rpcUrls: ['https://bsc-dataseed.binance.org'],
                        blockExplorerUrls: ['https://bscscan.com'],
                      }
                      library?.send('wallet_addEthereumChain', [params, account])
                    }}
                  >
                    <img src="/images/viral/binance.png" alt="" />
                  </button>
                </QuestionHelper>
              </div>
            </div>
          </div>
          {/* Add title with HEAD <Helmet>
            <title>ViralCoin | {i18n._(`Swap`)}</title>
            <meta
              name="description"
              content="ViralCoin allows for swapping of ERC20 compatible tokens across multiple networks"
            />
          </Helmet> */}
          <TokenWarningModal
            isOpen={importTokensNotInDefault.length > 0 && !dismissTokenWarning}
            tokens={importTokensNotInDefault}
            onConfirm={handleConfirmTokenWarning}
          />
          <DoubleGlowShadow>
            <div className="p-4 space-y-4 rounded bg-dark-900 z-1">
              <SwapHeader
                input={currencies[Field.INPUT]}
                output={currencies[Field.OUTPUT]}
                allowedSlippage={allowedSlippage}
              />
              {/* Modal-Swap{' '} */}
              <ConfirmSwapModal
                isOpen={showConfirm}
                trade={trade}
                originalTrade={tradeToConfirm}
                onAcceptChanges={handleAcceptChanges}
                attemptingTxn={attemptingTxn}
                txHash={txHash}
                recipient={recipient}
                allowedSlippage={allowedSlippage}
                onConfirm={handleSwap}
                swapErrorMessage={swapErrorMessage}
                onDismiss={handleConfirmDismiss}
                minerBribe={doArcher ? archerETHTip : undefined}
              />
              <div>
                <CurrencyInputPanel
                  // priceImpact={priceImpact}
                  label={
                    independentField === Field.OUTPUT && !showWrap ? i18n._(`Swap From (est.):`) : i18n._(`Swap From:`)
                  }
                  value={formattedAmounts[Field.INPUT]}
                  showMaxButton={showMaxButton}
                  currency={currencies[Field.INPUT]}
                  onUserInput={handleTypeInput}
                  onMax={handleMaxInput}
                  fiatValue={fiatValueInput ?? undefined}
                  onCurrencySelect={handleInputSelect}
                  otherCurrency={currencies[Field.OUTPUT]}
                  showCommonBases={true}
                  id="swap-currency-input"
                />
                <AutoColumn justify="space-between" className="py-3">
                  <div
                    className={classNames(
                      isExpertMode ? 'justify-between' : 'flex-start',
                      'px-4 flex-wrap w-full flex'
                    )}
                  >
                    <button
                      className="z-10 -mt-6 -mb-6 rounded-full"
                      onClick={() => {
                        setApprovalSubmitted(false) // reset 2 step UI for approvals
                        onSwitchTokens()
                      }}
                    >
                      <div className="rounded-full bg-dark-900 p-3px">
                        <div
                          className="p-3 rounded-full bg-dark-800 hover:bg-dark-700"
                          onMouseEnter={() => setAnimateSwapArrows(true)}
                          onMouseLeave={() => setAnimateSwapArrows(false)}
                        >
                          <Lottie
                            animationData={swapArrowsAnimationData}
                            autoplay={animateSwapArrows}
                            loop={false}
                            style={{ width: 32, height: 32 }}
                          />
                        </div>
                      </div>
                    </button>
                    {isExpertMode ? (
                      recipient === null && !showWrap ? (
                        <Button
                          variant="link"
                          size="none"
                          id="add-recipient-button"
                          onClick={() => onChangeRecipient('')}
                        >
                          + Add recipient (optional)
                        </Button>
                      ) : (
                        <Button
                          variant="link"
                          size="none"
                          id="remove-recipient-button"
                          onClick={() => onChangeRecipient(null)}
                        >
                          - {i18n._(`Remove recipient`)}
                        </Button>
                      )
                    ) : null}
                  </div>
                </AutoColumn>

                <div>
                  <CurrencyInputPanel
                    value={formattedAmounts[Field.OUTPUT]}
                    onUserInput={handleTypeOutput}
                    label={
                      independentField === Field.INPUT && !showWrap ? i18n._(`Swap To (est.):`) : i18n._(`Swap To:`)
                    }
                    showMaxButton={false}
                    hideBalance={false}
                    fiatValue={fiatValueOutput ?? undefined}
                    priceImpact={priceImpact}
                    currency={currencies[Field.OUTPUT]}
                    onCurrencySelect={handleOutputSelect}
                    otherCurrency={currencies[Field.INPUT]}
                    showCommonBases={true}
                    id="swap-currency-output"
                  />
                  {Boolean(trade) && (
                    <div className="p-1 -mt-2 cursor-pointer rounded-b-md bg-dark-800">
                      <TradePrice
                        price={trade?.executionPrice}
                        showInverted={showInverted}
                        setShowInverted={setShowInverted}
                        className="bg-dark-900"
                      />
                    </div>
                  )}
                </div>
              </div>
              {recipient !== null && !showWrap && (
                <>
                  <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
                  {recipient !== account && (
                    <Alert
                      type="warning"
                      dismissable={false}
                      showIcon
                      message={i18n._(
                        `Please note that the recipient address is different from the connected wallet address.`
                      )}
                    />
                  )}
                </>
              )}
              {/* {showWrap ? null : (
                                    <div
                                    style={{
                                        padding: showWrap ? '.25rem 1rem 0 1rem' : '0px',
                                    }}
                                    >
                                    <div className="px-5 mt-1">{doArcher && userHasSpecifiedInputOutput && <MinerTip />}</div>
                                    </div>
                                )} */}
              {/*
                                {trade && (
                                    <div className="p-5 rounded bg-dark-800">
                                    <AdvancedSwapDetails trade={trade} allowedSlippage={allowedSlippage} />
                                    </div>
                                )} */}
              <BottomGrouping>
                {
                  // swapIsUnsupported ? (
                  //   <Button color="red" size="lg" disabled>
                  //     {i18n._(`Unsupported Asset`)}
                  //   </Button>
                  // ) :

                  !account ? (
                    <Web3Connect size="lg" color="blue" className="w-full" />
                  ) : showWrap ? (
                    <Button color="gradient" size="lg" disabled={Boolean(wrapInputError)} onClick={onWrap}>
                      {wrapInputError ??
                        (wrapType === WrapType.WRAP
                          ? i18n._(`Wrap`)
                          : wrapType === WrapType.UNWRAP
                          ? i18n._(`Unwrap`)
                          : null)}
                    </Button>
                  ) : routeNotFound && userHasSpecifiedInputOutput ? (
                    <div style={{ textAlign: 'center' }}>
                      <div className="mb-1">{i18n._(`Insufficient liquidity for this trade`)}</div>
                      {/* jds {singleHopOnly && <div className="mb-1">{i18n._(`Try enabling multi-hop trades`)}</div>} */}
                    </div>
                  ) : showApproveFlow ? (
                    <div>
                      {approvalState !== ApprovalState.APPROVED && (
                        <ButtonConfirmed
                          onClick={handleApprove}
                          disabled={approvalState !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                          size="lg"
                        >
                          {approvalState === ApprovalState.PENDING ? (
                            <div className="flex items-center justify-center h-full space-x-2">
                              <div>Approving</div>
                              <Loader stroke="white" />
                            </div>
                          ) : (
                            i18n._(`Approve ${currencies[Field.INPUT]?.symbol}`)
                          )}
                        </ButtonConfirmed>
                      )}
                      {approvalState === ApprovalState.APPROVED && (
                        <ButtonError
                          onClick={() => {
                            if (isExpertMode) {
                              // handleSwap()
                            } else {
                              setSwapState({
                                tradeToConfirm: trade,
                                attemptingTxn: false,
                                swapErrorMessage: undefined,
                                showConfirm: true,
                                txHash: undefined,
                              })
                            }
                          }}
                          style={{
                            width: '100%',
                            backgroundColor: '#13BFC6',
                            color: '#fff',
                          }}
                          id="swap-button"
                          disabled={
                            !isValid ||
                            approvalState !== ApprovalState.APPROVED ||
                            (priceImpactSeverity > 3 && !isExpertMode)
                          }
                          error={isValid && priceImpactSeverity > 2}
                        >
                          {priceImpactSeverity > 3 && !isExpertMode
                            ? i18n._(`Price Impact High`)
                            : priceImpactSeverity > 2
                            ? i18n._(`Swap Anyway`)
                            : i18n._(`Swap`)}
                        </ButtonError>
                      )}
                    </div>
                  ) : (
                    <ButtonError
                      style={{ backgroundColor: '#13BFC6', color: '#fff' }}
                      onClick={() => {
                        if (isExpertMode) {
                          // handleSwap()
                        } else {
                          setSwapState({
                            tradeToConfirm: trade,
                            attemptingTxn: false,
                            swapErrorMessage: undefined,
                            showConfirm: true,
                            txHash: undefined,
                          })
                        }
                      }}
                      id="swap-button"
                      disabled={
                        !isValid || (priceImpactSeverity > 3 && !isExpertMode)
                        // || !!swapCallbackError
                      }
                      error={
                        isValid && priceImpactSeverity > 2
                        // && !swapCallbackError
                      }
                    >
                      {swapInputError
                        ? swapInputError
                        : priceImpactSeverity > 3 && !isExpertMode
                        ? i18n._(`Price Impact Too High`)
                        : priceImpactSeverity > 2
                        ? i18n._(`Swap Anyway`)
                        : i18n._(`Swap`)}
                    </ButtonError>
                  )
                }
                {showApproveFlow && (
                  <Column style={{ marginTop: '1rem' }}>
                    <ProgressSteps steps={[approvalState === ApprovalState.APPROVED]} />
                  </Column>
                )}
                {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
              </BottomGrouping>
              {/* {!swapIsUnsupported ? null : (
                <UnsupportedCurrencyFooter
                  show={swapIsUnsupported}
                  currencies={[currencies.INPUT, currencies.OUTPUT]}
                />
              )} */}
            </div>
          </DoubleGlowShadow>
        </div>
      </div>
    </section>
  )
}

export default SwapSection
