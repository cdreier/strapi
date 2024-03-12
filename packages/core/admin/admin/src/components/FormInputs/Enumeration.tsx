import { forwardRef } from 'react';

import { SingleSelect, SingleSelectOption, useComposedRefs } from '@strapi/design-system';
import { useFocusInputField } from '@strapi/helper-plugin';

import { useField } from '../Form';

import { EnumerationProps } from './types';

export const EnumerationInput = forwardRef<any, EnumerationProps>(
  ({ disabled, label, hint, name, options = [], placeholder, required }, ref) => {
    const field = useField(name);
    const fieldRef = useFocusInputField(name);

    const composedRefs = useComposedRefs(ref, fieldRef);

    return (
      <SingleSelect
        ref={composedRefs}
        disabled={disabled}
        error={field.error}
        // @ts-expect-error – label _could_ be a ReactNode since it's a child, this should be fixed in the DS.
        label={label}
        hint={hint}
        name={name}
        onChange={(value) => {
          field.onChange(name, value);
        }}
        placeholder={placeholder}
        required={required}
        value={field.value}
      >
        {options.map(({ value, label, disabled, hidden }) => {
          return (
            <SingleSelectOption key={value} value={value} disabled={disabled} hidden={hidden}>
              {label ?? value}
            </SingleSelectOption>
          );
        })}
      </SingleSelect>
    );
  }
);