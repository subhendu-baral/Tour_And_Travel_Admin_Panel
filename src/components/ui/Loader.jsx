import {Loader2} from 'lucide-react';

export default function Loader({message}) {
  return (
    <>
    <>{message}</>
    <Loader2 className='h-4 w-4 animate-spin' />
    </>
  )
}
