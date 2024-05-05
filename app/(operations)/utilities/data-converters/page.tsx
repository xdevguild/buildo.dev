import type { NextPage } from 'next';
import { DataConverters } from './components/data-converters';
import { Separator } from '@/components/ui/separator';

const DataConvertersPage: NextPage = () => {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        <h1 className="mb-3 scroll-m-20 text-2xl font-semibold leading-none tracking-tight">
          Covert data
        </h1>
        <p className="text-sm text-muted-foreground">
          You can convert the data - for example, string to hex string, etc.
          Choose the conversion type from the selector.
        </p>
      </div>
      <DataConverters />
      <Separator className="my-12" />
      <div className="text-xs">
        <p className="mb-3">
          The functionality described focuses on data conversion, a crucial
          process for various applications, particularly in the blockchain
          context. This includes converting data from a string format to a
          hexadecimal (hex) string or to Base64 encoding. Such conversions are
          essential for ensuring data integrity, security, and compatibility
          across different systems and platforms.
        </p>
        <p>
          Understanding and implementing these conversions can significantly
          enhance the security and efficiency of blockchain applications.
          Developers looking to optimize blockchain functionality will find
          these tools invaluable for data manipulation and storage, enabling
          smoother and more secure transactions. Moreover, mastering these data
          conversions is critical for anyone involved in developing or
          maintaining blockchain technology, as it ensures compatibility and
          performance across diverse systems and software environments.
        </p>
      </div>
    </div>
  );
};

export default DataConvertersPage;
