'use client';

import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from 'lucide-react';
import React, { useId, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { PASSWORD_RULES } from '@/lib/validation';

const requirements = [
  {
    regex: new RegExp(`.{${PASSWORD_RULES.min},}`),
    text: `At least ${PASSWORD_RULES.min} characters`,
  },
  { regex: PASSWORD_RULES.lowercase, text: 'At least 1 lowercase letter' },
  { regex: PASSWORD_RULES.uppercase, text: 'At least 1 uppercase letter' },
  { regex: PASSWORD_RULES.number, text: 'At least 1 number' },
  { regex: PASSWORD_RULES.special, text: 'At least 1 special character' },
];

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  value: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, value, className, id, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible((prev) => !prev);

    const generatedId = useId();
    const inputId = id || generatedId;

    const strength = useMemo(
      () =>
        requirements.map((req) => ({
          met: req.regex.test(value || ''),
          text: req.text,
        })),
      [value],
    );

    const strengthScore = useMemo(
      () => strength.filter((req) => req.met).length,
      [strength],
    );

    const getColor = (score: number) => {
      if (score === 0) return 'bg-neutral-200';
      if (score <= 2) return 'bg-red-600';
      if (score <= 4) return 'bg-yellow-600';
      return 'bg-green-600';
    };

    return (
      <div className="w-full space-y-2">
        {label && (
          <Label htmlFor={inputId} className="text-neutral-600 font-medium">
            {label}
          </Label>
        )}

        <div className="relative">
          <Input
            {...props}
            id={inputId}
            ref={ref}
            type={isVisible ? 'text' : 'password'}
            className={cn(
              'pr-10 border-neutral-300 text-neutral-900',
              error && 'border-red-500',
              className,
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleVisibility}
            className="absolute right-0 top-0 h-full text-neutral-400 hover:bg-transparent hover:text-black cursor-pointer"
          >
            {isVisible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </Button>
        </div>

        <div className="flex h-1.5 w-full gap-1" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={cn(
                'h-full flex-1 rounded-full transition-all duration-500',
                step <= strengthScore
                  ? getColor(strengthScore)
                  : 'bg-neutral-200',
              )}
            />
          ))}
        </div>

        <ul className="space-y-1.5" aria-label="Password requirements">
          {strength.map((req) => (
            <li key={req.text} className="flex items-center gap-2 text-xs">
              {req.met ? (
                <CheckIcon className="size-3 text-green-600" />
              ) : (
                <XIcon className="size-3 text-neutral-300" />
              )}
              <span className={req.met ? 'text-green-600' : 'text-neutral-400'}>
                {req.text}
              </span>
            </li>
          ))}
        </ul>

        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
