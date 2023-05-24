import Image from 'next/image'
import { Dispatch, SetStateAction, ChangeEvent, useState } from 'react'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import moment from 'moment-timezone';
import fetcher from '@/services/fetcher';
import useSWR from 'swr'
import calculateConversion from '@/services/calculateConversion';
import CurrencyCard from '@/components/CurrencyCard';
import CurrencyForm from '@/components/CurrencyForm';
import Loader from '@/components/Loader';


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
    isLoading ? <Loader /> :
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
      {!showResult ? <CurrencyForm
      dolar={dolar}
      setDolar={setDolar}
      taxState={taxState}
      setTaxState={setTaxState}
      typeOfPurchase={typeOfPurchase}
      setTypeOfPurchase={setTypeOfPurchase}
      handleChange={handleChange}
      handleConvert={handleConvert}
      /> : <CurrencyCard
        data={data}
        typeOfPurchase={typeOfPurchase}
        taxState={taxState}
        handleBack={handleBack}
        convertedValue={convertedValue}
      />
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