'use client';

import * as React from 'react';
import Image from 'next/image';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { cn } from '@lib/utils';

export interface Country {
  code: string;
  dialCode: string;
  name: string;
  flag: string | React.ReactNode;
}

const COUNTRIES: Country[] = [
  {
    code: 'VN',
    dialCode: '+84',
    name: 'Vietnam',
    flag: (
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
        alt="Vietnam"
        width={24}
        height={16}
        className="h-4 w-6 object-cover"
        unoptimized
      />
    ),
  },
  {
    code: 'US',
    dialCode: '+1',
    name: 'United States',
    flag: (
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
        alt="United States"
        width={24}
        height={16}
        className="h-4 w-6 object-cover"
        unoptimized
      />
    ),
  },
];

export interface PhoneInputProps
  extends Omit<React.ComponentProps<'input'>, 'value' | 'onChange' | 'type'> {
  value?: string;
  onChange?: (value: string, countryCode: string, fullNumber: string) => void;
  defaultCountry?: string;
  className?: string;
  inputClassName?: string;
  selectClassName?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value = '',
      onChange,
      defaultCountry = 'VN',
      className,
      inputClassName,
      selectClassName,
      placeholder = 'Enter phone number',
      disabled,
      size, // Destructure size here to exclude it from ...props
      ...props
    },
    ref
  ) => {
    const [selectedCountry, setSelectedCountry] = React.useState<string>(defaultCountry);
    const [phoneNumber, setPhoneNumber] = React.useState<string>(value.replace(/^\+\d+/, '') || '');

    const selectedCountryData = COUNTRIES.find((c) => c.code === selectedCountry) || COUNTRIES[0];

    // Sync với value prop nếu là controlled component
    React.useEffect(() => {
      if (value) {
        // Nếu value có chứa country code, tách ra
        const countryMatch = COUNTRIES.find((c) => value.startsWith(c.dialCode));
        if (countryMatch) {
          setSelectedCountry(countryMatch.code);
          setPhoneNumber(value.replace(countryMatch.dialCode, '').trim());
        } else {
          setPhoneNumber(value);
        }
      } else {
        setPhoneNumber('');
      }
    }, [value]);

    const handleCountryChange = (countryCode: string) => {
      setSelectedCountry(countryCode);
      const country = COUNTRIES.find((c) => c.code === countryCode);
      if (country && onChange) {
        const fullNumber = `${country.dialCode}${phoneNumber}`;
        onChange?.(phoneNumber, country.dialCode, fullNumber);
      }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPhoneNumber = e.target.value.replace(/\D/g, ''); // Chỉ cho phép số
      setPhoneNumber(newPhoneNumber);
      const country = COUNTRIES.find((c) => c.code === selectedCountry);
      if (country && onChange) {
        let fullNumber = '';
        if (newPhoneNumber === '') {
          fullNumber = '';
        } else {
          fullNumber = `${country.dialCode}${newPhoneNumber}`;
        }
        onChange?.(newPhoneNumber, country.dialCode, fullNumber);
      }
    };

    return (
      <div className={cn('flex gap-2', className)}>
        {/* Country Code Select */}
        <Select value={selectedCountry} onValueChange={handleCountryChange} disabled={disabled}>
          <SelectTrigger className={cn('w-[100px] shrink-0', selectClassName)}>
            <SelectValue>
              <div className="flex items-center gap-2">
                <span className="flex items-center">
                  {COUNTRIES.find((c) => c.code === selectedCountry)?.flag}
                </span>
                <span className="text-sm font-medium">{selectedCountryData.dialCode}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <div className="flex items-center gap-2">
                  <span className="flex items-center">{country.flag}</span>
                  <span className="text-sm">{country.name}</span>
                  <span className="text-muted-foreground text-sm">{country.dialCode}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Phone Number Input */}
        <Input
          ref={ref}
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          className={cn('flex-1', inputClassName)}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput, COUNTRIES };
