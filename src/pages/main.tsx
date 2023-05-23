import Image from 'next/image'
import { Dispatch, SetStateAction, ChangeEvent, useState, useEffect } from 'react'
import requestAPI from '@/services/fetcher'
import { format, set } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import moment from 'moment-timezone';
import fetcher from '@/services/fetcher';
import useSWR from 'swr'
import calculateConversion from '@/services/calculateConversion';


export default function Main() {

  const [dolar, setDolar] = useState('');
  const [taxState, setTaxState] = useState('');
  const [typeOfPurchase, setTypeOfPurchase] = useState('money') as [string, Dispatch<SetStateAction<string>>];
  const [convertedValue, setConvertedValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const URL_BASE = 'https://economia.awesomeapi.com.br/json/last/';
  const COIN = 'USD-BRL';

  const handleChange = (setState: Dispatch<SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value)
  };

  const { data, error, isLoading } = useSWR(`${URL_BASE}${COIN}`, fetcher)

  const handleConvert = () => {
    setConvertedValue(
      calculateConversion(
        typeOfPurchase,
        Number(dolar.replace(',', '.').replace('$', '')),
        Number(taxState.replace(',', '.').replace('%', '')),
        +Number(data.USDBRL.bid).toFixed(2)
      )
    );
    setShowResult(true);
  };

  const handleBack = () => {
    setShowResult(false)
    setDolar('')
    setTaxState('')
  };

  const DATE = moment().tz('America/Sao_Paulo');
  const HOUR = DATE.format('HH:mm');
  const FORMATED_DATE = format(DATE.toDate(), 'dd \'de\' MMMM yyyy', { locale: ptBR });

  return (
    <main className="flex flex-col items-start justify-between p-24">
      <section className='flex justify-around'>
        <div>
          <Image
            src="/stone.svg"
            alt="Stone Logo"
            width={100}
            height={24}
            priority
          />
        </div>
        <div className='ml-10'>
          <p className='block font-size-18 font-medium text-blue-cyan-700 roboto'>{FORMATED_DATE} | {HOUR} UTC -3</p>
          <p className='block font-size-14 font-normal text-blue-cyan-100 roboto'>Dados de câmbio disponibilizados pela Morningstar.</p>
        </div>
      </section>
      {!showResult ?
        <>
          <section>
            <div className='auto-layout-form mt-20'>
              <div className='auto-layout-input'>
                <span className="block font-size-18 font-medium roboto text-blue-cyan-800">
                  Dólar
                </span>
                <input type="text" name="dolar" onChange={handleChange(setDolar)} value={dolar} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded sm:font-size-16 focus:ring-1 dp-shadow-small" placeholder="$ 1,00" required />
              </div>
              <div className='auto-layout-input'>
                <span className="block font-size-18 font-medium roboto text-blue-cyan-800">
                  Taxa do Estado
                </span>
                <input type="text" name="taxState" onChange={handleChange(setTaxState)} value={taxState} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded sm:font-size-16 focus:ring-1 dp-shadow-small" placeholder="0 %" />
              </div>
            </div>
          </section>
          <section>
            <fieldset className="auto-layout-radio">
              <legend className='mt-5 mb-5 font-size-18 font-medium roboto text-blue-cyan-800'>Tipo de compra</legend>
              <div className="radio-wrapper">
                <label className="radio-button">
                  <input type="radio"
                    name="radio-group"
                    id="option1"
                    value='money'
                    checked={typeOfPurchase === 'money'}
                    onChange={handleChange(setTypeOfPurchase)} />
                  <span className="radio-checkmark"></span>
                  <span className="block text-size-rem-1 font-450 circular-std text-blue-cyan-800">Dinheiro</span>
                </label>
              </div>

              <div className="radio-wrapper">
                <label className="radio-button">
                  <input type="radio"
                    name="radio-group"
                    id="option2"
                    value='card'
                    checked={typeOfPurchase === 'card'}
                    onChange={handleChange(setTypeOfPurchase)} />
                  <span className="radio-checkmark"></span>
                  <span className="block text-size-rem-1 font-450 circular-std text-blue-cyan-800">Cartão</span>
                </label>
              </div>
            </fieldset>
          </section>
          <section>
            <div>
              <button type="button" className="button-converter mt-16 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={handleConvert} disabled={dolar === ''}>
                <Image
                  src="/doubleArrow.svg"
                  alt=""
                  width={20}
                  height={16.94}
                  priority
                />
                <span className='ml-2 font-size-16'>Converter</span>
              </button>
            </div>
          </section>
        </> : <section>
          <div className='auto-layout-currency-card'>
            <button type="button" onClick={handleBack} className="back-button mt-16 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
              <Image
                src="/leftArrow.svg"
                alt=""
                width={20}
                height={16.94}
                priority
              />
              <span className='ml-2 font-size-16 font-semibold sharon-sans'>Voltar</span>
            </button>
            <div className='inside-auto-layout'>
              <p className=' header-currency-card'>O resultado do cálculo é</p>
              <p className='value-converted'>{convertedValue}</p>
            </div>
            <div>
              <p className='radio-block-tipograpy'>
                Compra no {typeOfPurchase === 'money' ? 'dinheiro' : 'cartão'} e taxa de <span className='font-normal'>
                  {taxState.replace(',', '.').replace('%', '')}%
                </span>
              </p>
              <p className='radio-block-tipograpy'>
                Cotação do dólar: <span className='font-normal'>
                  $1,00 = {Number(data.USDBRL.ask).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </p>
            </div>
          </div>
        </section>
      }
      <div className='absolute bottom-0 right-0 responsiveDolar'>
        <Image
          src="/dollar.svg"
          alt="Stone Logo"
          width={790}
          height={768}
          layout='responsive'
          priority
        />
      </div>
      <Image
        className='mask sm:mask-sm'
        src="/graph.svg"
        alt='Graph'
        width={100}
        height={24}
        priority
      />
    </main >
  )
}