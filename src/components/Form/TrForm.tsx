
'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { ReactElement, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type FormConfig = {
    defaultValues?: Record<string, any>;
    resolver?: any;
};

type FormProps = {
    children?: ReactElement | ReactNode;
    onSubmit: SubmitHandler<any>;
    className?: string;
} & FormConfig;

export default function TrForm({
    onSubmit,
    children,
    resolver,
    defaultValues,
    className,
}: FormProps) {
    const formConfig: FormConfig = {};
    if (resolver) {
        formConfig['resolver'] = resolver;
    }

    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues;
    }

    const methods = useForm(formConfig);

    return (
        <FormProvider {...methods}>
            <Form {...methods}>
                <form
                    className={cn(` flex flex-col gap-3`, className)}
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    {children}
                </form>
            </Form>
        </FormProvider>
    );
}
