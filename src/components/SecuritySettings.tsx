
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronRight, Key, Lock, Shield, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";

interface SecuritySettingsProps {
  onBack: () => void;
}

type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type PinFormValues = {
  pin: string;
  confirmPin: string;
};

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'password' | 'pin' | '2fa'>('password');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [otp, setOtp] = useState("");

  const passwordForm = useForm<PasswordFormValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const pinForm = useForm<PinFormValues>({
    defaultValues: {
      pin: "",
      confirmPin: "",
    },
  });

  const onPasswordSubmit = (data: PasswordFormValues) => {
    // Here you would typically send the data to your backend
    console.log("Password change requested:", data);
    
    // Show success message
    toast.success("Password successfully updated");
    
    // Reset form
    passwordForm.reset();
  };

  const onPinSubmit = (data: PinFormValues) => {
    console.log("PIN update requested:", data);
    toast.success("Security PIN successfully updated");
    pinForm.reset();
  };

  const enableTwoFactor = () => {
    setShowQrCode(true);
  };

  const verifyTwoFactor = () => {
    if (otp.length === 6) {
      console.log("Verifying OTP:", otp);
      setTwoFactorEnabled(true);
      setShowQrCode(false);
      setVerificationStep(false);
      toast.success("Two-factor authentication enabled successfully");
    } else {
      toast.error("Please enter a valid 6-digit code");
    }
  };

  const disableTwoFactor = () => {
    setTwoFactorEnabled(false);
    toast.success("Two-factor authentication disabled");
  };

  return (
    <div className="py-8 space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ChevronRight className="mr-2 rotate-180" size={16} />
          Back
        </Button>
        <h1 className="text-2xl font-semibold">Security Settings</h1>
      </div>

      <div className="flex space-x-2 mb-6">
        <Button 
          variant={activeTab === 'password' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('password')}
          className="flex-1"
        >
          <Key size={16} className="mr-2" />
          Password
        </Button>
        <Button 
          variant={activeTab === 'pin' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('pin')}
          className="flex-1"
        >
          <Lock size={16} className="mr-2" />
          Security PIN
        </Button>
        <Button 
          variant={activeTab === '2fa' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('2fa')}
          className="flex-1"
        >
          <Shield size={16} className="mr-2" />
          Two-Factor
        </Button>
      </div>

      {activeTab === 'password' && (
        <div className="crypto-card">
          <h2 className="text-lg font-medium mb-4">Change Password</h2>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Password must be at least 8 characters with a mix of letters, numbers, and symbols.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">Update Password</Button>
            </form>
          </Form>
        </div>
      )}

      {activeTab === 'pin' && (
        <div className="crypto-card">
          <h2 className="text-lg font-medium mb-4">Security PIN</h2>
          <p className="text-sm text-muted-foreground mb-4">
            A Security PIN adds an extra layer of protection for sensitive operations like withdrawals and large transactions.
          </p>
          
          <Form {...pinForm}>
            <form onSubmit={pinForm.handleSubmit(onPinSubmit)} className="space-y-4">
              <FormField
                control={pinForm.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>4-Digit PIN</FormLabel>
                    <FormControl>
                      <Input type="password" maxLength={4} pattern="[0-9]*" inputMode="numeric" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your PIN should be 4 digits and easy for you to remember but hard for others to guess.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={pinForm.control}
                name="confirmPin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm PIN</FormLabel>
                    <FormControl>
                      <Input type="password" maxLength={4} pattern="[0-9]*" inputMode="numeric" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-2">
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox id="require-pin" />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="require-pin">
                      Require PIN for all transactions
                    </FormLabel>
                    <FormDescription>
                      If unchecked, PIN will only be required for high-value transactions.
                    </FormDescription>
                  </div>
                </FormItem>
              </div>
              
              <Button type="submit" className="w-full">Set Security PIN</Button>
            </form>
          </Form>
        </div>
      )}

      {activeTab === '2fa' && (
        <div className="crypto-card">
          <h2 className="text-lg font-medium mb-4">Two-Factor Authentication (2FA)</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Two-factor authentication adds an extra layer of security to your account by requiring a second verification step when you sign in.
          </p>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className={twoFactorEnabled ? "text-green-500" : "text-muted-foreground"} />
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  {twoFactorEnabled ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
            <Switch 
              checked={twoFactorEnabled} 
              onCheckedChange={(checked) => {
                if (!checked) {
                  disableTwoFactor();
                } else {
                  enableTwoFactor();
                }
              }} 
            />
          </div>
          
          {showQrCode && (
            <div className="mt-4 space-y-4">
              <Alert>
                <AlertDescription>
                  Scan this QR code with an authenticator app like Google Authenticator or Authy.
                </AlertDescription>
              </Alert>
              
              <div className="flex justify-center p-4 bg-white rounded-md">
                {/* Placeholder for QR code - in a real app, this would be a real QR code */}
                <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                  <p className="text-xs text-gray-500">QR Code Placeholder</p>
                </div>
              </div>
              
              <p className="text-sm text-center">
                Can't scan the QR code? Use this code instead:
              </p>
              <p className="font-mono text-center bg-secondary p-2 rounded">
                ABCD EFGH IJKL MNOP
              </p>
              
              <Button 
                onClick={() => setVerificationStep(true)} 
                className="w-full"
              >
                I've scanned the QR code
              </Button>
            </div>
          )}
          
          {verificationStep && (
            <div className="mt-4 space-y-4">
              <p className="font-medium">Verify your authenticator app</p>
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code from your authenticator app to verify and enable 2FA.
              </p>
              
              <div className="flex justify-center py-4">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <Button 
                onClick={verifyTwoFactor} 
                className="w-full"
                disabled={otp.length !== 6}
              >
                Verify and Enable 2FA
              </Button>
            </div>
          )}
          
          {twoFactorEnabled && !showQrCode && !verificationStep && (
            <>
              <Alert className="mb-4">
                <AlertDescription>
                  Two-factor authentication is currently enabled on your account. You'll need to provide a verification code when signing in.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <p className="font-medium">Recovery options</p>
                <div>
                  <RadioGroup defaultValue="email">
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="email" id="email" />
                      <FormLabel htmlFor="email">Email recovery codes</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="download" id="download" />
                      <FormLabel htmlFor="download">Download recovery codes</FormLabel>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button variant="outline" className="w-full">
                  Generate Recovery Codes
                </Button>
                
                <Button variant="destructive" onClick={disableTwoFactor} className="w-full">
                  Disable Two-Factor Authentication
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;
