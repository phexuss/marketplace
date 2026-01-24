import LogoutEverywhereButton from '@/components/profile/logout-everywhere-button';
import EmailSection from './email-section';
import NameSection from './name-section';
import PasswordSection from './password-section';

interface ProfileSettingsProps {
  name: string;
  email: string;
}

export default function ProfileSettings({ name, email }: ProfileSettingsProps) {
  return (
    <div className="bg-white border border-neutral-100 rounded-3xl p-6 space-y-6 shadow-sm">
      <h2 className="font-semibold text-lg border-b border-neutral-50 pb-2">
        Profile Settings
      </h2>

      <div className="space-y-5">
        <NameSection name={name} />
        <EmailSection email={email} />
        <PasswordSection />
        <LogoutEverywhereButton />
      </div>
    </div>
  );
}
