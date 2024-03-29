import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { OperationsInputField } from '@/components/operations/operations-input-field';
import { OperationsSubmitButton } from '@/components/operations/operations-submit-button';
import { OperationContentProps } from '@/components/operations/operations-common-types';
import { commonBuiltInOpertationsGasLimit } from '@/components/operations/constants';
import {
  ContractCallPayloadBuilder,
  ContractFunction,
} from '@multiversx/sdk-core';

const formSchema = z.object({
  smartContractAddress: z.string().min(1, 'The field is required'),
});

export const ClaimDevRewards = ({
  triggerTx,
  close,
}: OperationContentProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      smartContractAddress: '',
    },
  });

  const onSubmit = async ({
    smartContractAddress,
  }: z.infer<typeof formSchema>) => {
    const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('ClaimDeveloperRewards'))
      .build();

    triggerTx?.({
      address: smartContractAddress.trim(),
      gasLimit: commonBuiltInOpertationsGasLimit,
      data,
      value: 0,
    });

    form.reset();
    close();
  };

  return (
    <>
      <DialogHeader className="p-8 pb-0">
        <DialogTitle>Claim developer rewards</DialogTitle>
        <DialogDescription>
          This function is to be used by Smart Contract owners in order to claim
          the fees accumulated during smart contract calls. Currently, the
          developer reward is set to 30% of the fee of each smart contract call.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-auto px-8 py-0">
        <Form {...form}>
          <form
            id="claim-rewards-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex-1 overflow-auto p-1">
              <OperationsInputField
                name="smartContractAddress"
                label="Smart contract address"
                placeholder="Example: erd1qqqqq..."
                description="Please provide the smart contract address where the wallet you use is an owner."
              />
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter className="px-8 py-4">
        <OperationsSubmitButton formId="claim-rewards-form" />
      </DialogFooter>
    </>
  );
};
