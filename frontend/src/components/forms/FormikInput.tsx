import { FieldContainer } from 'components/forms/FieldContainer';
import { Input } from 'components/forms/Input';
import { Label, LabelStyle } from 'components/forms/Label';
import { Field } from 'formik';
import { FieldAttributes } from 'formik/dist/Field';
import React, { ReactNode } from 'react';

interface FormikInputParams
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string;
  label?: string;
  description?: ReactNode;
  labelStyle?: LabelStyle;
  type?: 'text' | 'textarea' | string;
}

export function FormikInput<FormDefinition>({
  name,
  label,
  description,
  type = 'text',
  labelStyle = 'visible',
  ...rest
}: FormikInputParams) {
  return (
    <Field name={name}>
      {({ field, meta }: FieldAttributes<any>) => (
        <FieldContainer meta={meta}>
          <Label labelStyle={labelStyle} htmlFor={name}>
            {label}
          </Label>
          <div className="mt-2">
            {type === 'textarea' ? (
              <textarea
                id={name}
                name={name}
                {...rest}
                {...field}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 min-h-18"
              />
            ) : (
              <Input
                id={name}
                name={name}
                inputTheme={meta.error ? 'error' : 'standard'}
                type={type}
                {...rest}
                {...field}
              />
            )}
          </div>
        </FieldContainer>
      )}
    </Field>
  );
}
