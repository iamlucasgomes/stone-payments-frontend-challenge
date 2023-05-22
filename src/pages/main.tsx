import Image from 'next/image'
import { Dispatch, SetStateAction, ChangeEvent, useState, useEffect } from 'react'
import requestAPI from '@/services/requestAPI'
import { format, set } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import moment from 'moment-timezone';
import calculateConversion from '@/services/calculateConversion';

export default function Main() {

  const [dolar, setDolar] = useState('');
  const [taxState, setTaxState] = useState('');
  const [typeOfPurchase, setTypeOfPurchase] = useState('money') as [string, Dispatch<SetStateAction<string>>];
  const [cotations, setCotations] = useState<ResponseAPI>({} as ResponseAPI);
  const [convertedValue, setConvertedValue] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleChange = (setState: Dispatch<SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value)
  };

  const getDolar = async () => {
    await requestAPI().then((response) => setCotations(response.USDBRL))
  }

  useEffect(() => {
    getDolar()
  }, [])

  const handleConvert = () => {
    getDolar();
    setConvertedValue(calculateConversion(typeOfPurchase, Number(dolar.replace(',', '.')), Number(taxState === '' && 0), +Number(cotations.bid).toFixed(2)));
    setDolar('');
    setTaxState('');
    setShowResult(true);
  }

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
          <p className='block text-sm font-medium text-slate-700'>{FORMATED_DATE} | {HOUR} UTC -3</p>
          <p className='block text-sm font-medium text-slate-700'>Dados de câmbio disponibilizados pela Morningstar.</p>
        </div>
      </section>
      {!showResult ?
        <>
          <section>
            <div className='auto-layout-form mt-20'>
              <div className='auto-layout-input'>
                <span className="block text-sm font-medium text-slate-700">
                  Dólar
                </span>
                <input type="text" name="dolar" onChange={handleChange(setDolar)} value={dolar} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded sm:text-sm focus:ring-1 dp-shadow-small" placeholder="$ 1,00" required />
              </div>
              <div className='auto-layout-input'>
                <span className="block text-sm font-medium text-slate-700">
                  Taxa do Estado
                </span>
                <input type="text" name="taxState" onChange={handleChange(setTaxState)} value={taxState} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded sm:text-sm focus:ring-1 dp-shadow-small" placeholder="0 %" />
              </div>
            </div>
          </section>
          <section>
            <fieldset className="auto-layout-radio">
              <legend className='mt-5 mb-5 text-sm font-medium text-slate-700'>Tipo de compra</legend>
              <div className="radio-wrapper">
                <label className="radio-button">
                  <input type="radio"
                    name="radio-group"
                    id="option1"
                    value='money'
                    checked={typeOfPurchase === 'money'}
                    onChange={handleChange(setTypeOfPurchase)} />
                  <span className="radio-checkmark"></span>
                  <span className="block text-sm font-medium text-slate-700">Dinheiro</span>
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
                  <span className="block text-sm font-medium text-slate-700">Cartão</span>
                </label>
              </div>
            </fieldset>
          </section>
          <section>
            <div>
              <button type="button" className="mt-16 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={handleConvert}>
                <Image
                  src="/doubleArrow.svg"
                  alt=""
                  width={20}
                  height={16.94}
                  priority
                />
                <span className='ml-2'>Converter</span>
              </button>
            </div>
          </section>
        </> : <section>
          <div className='auto-layout-form mt-20'>
            <p>calma ae firma</p>
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
        className='mask'
        src="/graph.svg"
        alt='Graph'
        width={100}
        height={24}
        priority
      />
    </main >
  )
}