import { redirect } from 'next/navigation';

export default async function Inscriptions() {
  redirect('/inscriptions/create');
}
