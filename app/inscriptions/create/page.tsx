import { NextPage } from 'next';
import { InscriptionsCreate } from '../components/inscription-create';
import { Suspense } from 'react';

const InscriptionsCreatePage: NextPage = () => {
  return (
    <Suspense>
      <InscriptionsCreate />
    </Suspense>
  );
};

export default InscriptionsCreatePage;
