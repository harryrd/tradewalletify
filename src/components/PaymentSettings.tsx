
import React, { useState } from "react";
import { ChevronRight, CreditCard, Building, Paypal, Plus, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface PaymentMethod {
  id: string;
  type: "bank" | "card" | "paypal";
  name: string;
  details: string;
  isDefault: boolean;
}

interface PaymentSettingsProps {
  onBack: () => void;
}

const PaymentSettings: React.FC<PaymentSettingsProps> = ({ onBack }) => {
  const [savedMethods, setSavedMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      name: "Visa ending in 4242",
      details: "Expires 04/2025",
      isDefault: true,
    },
  ]);
  
  const [isAddingMethod, setIsAddingMethod] = useState(false);
  const [newMethodType, setNewMethodType] = useState<"bank" | "card" | "paypal">("card");
  const [formData, setFormData] = useState({
    accountName: "",
    accountNumber: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paypalEmail: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addPaymentMethod = () => {
    let name = "";
    let details = "";

    if (newMethodType === "bank") {
      name = `Bank account - ${formData.accountName}`;
      details = `Account ending in ${formData.accountNumber.slice(-4)}`;
    } else if (newMethodType === "card") {
      name = `Card ending in ${formData.cardNumber.slice(-4)}`;
      details = `Expires ${formData.expiryDate}`;
    } else if (newMethodType === "paypal") {
      name = "PayPal";
      details = formData.paypalEmail;
    }

    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: newMethodType,
      name,
      details,
      isDefault: savedMethods.length === 0,
    };

    setSavedMethods(prev => [...prev, newMethod]);
    setIsAddingMethod(false);
    setFormData({
      accountName: "",
      accountNumber: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      paypalEmail: "",
    });

    toast({
      title: "Payment method added",
      description: `${name} has been added to your account.`,
    });
  };

  const removePaymentMethod = (id: string) => {
    const methodToRemove = savedMethods.find(method => method.id === id);
    setSavedMethods(prev => prev.filter(method => method.id !== id));
    
    toast({
      title: "Payment method removed",
      description: `${methodToRemove?.name} has been removed from your account.`,
    });
  };

  const setDefaultPaymentMethod = (id: string) => {
    setSavedMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );

    const methodName = savedMethods.find(method => method.id === id)?.name;
    toast({
      title: "Default payment method updated",
      description: `${methodName} is now your default payment method.`,
    });
  };

  return (
    <div className="py-8 space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ChevronRight className="mr-2 rotate-180" size={16} />
        Back to settings
      </Button>
      
      <div>
        <h1 className="text-2xl font-semibold">Payment Methods</h1>
        <p className="text-muted-foreground text-sm">Manage your payment methods</p>
      </div>

      {/* Saved payment methods */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Your payment methods</h2>
        
        {savedMethods.length === 0 ? (
          <div className="text-center p-8 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No payment methods added yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedMethods.map((method) => (
              <div key={method.id} className="crypto-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {method.type === "card" && <CreditCard size={18} className="text-primary" />}
                    {method.type === "bank" && <Building size={18} className="text-primary" />}
                    {method.type === "paypal" && <Paypal size={18} className="text-primary" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{method.name}</p>
                      {method.isDefault && (
                        <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{method.details}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDefaultPaymentMethod(method.id)}
                      >
                        <Check size={16} className="mr-1" />
                        Set default
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePaymentMethod(method.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <Button
          variant="outline"
          className="mt-4 w-full"
          onClick={() => setIsAddingMethod(true)}
        >
          <Plus size={16} className="mr-2" />
          Add payment method
        </Button>
      </div>

      {/* Add payment method dialog */}
      <Dialog open={isAddingMethod} onOpenChange={setIsAddingMethod}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add payment method</DialogTitle>
            <DialogDescription>
              Choose a payment method type and enter the required details.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <RadioGroup
              value={newMethodType}
              onValueChange={(value) => setNewMethodType(value as "bank" | "card" | "paypal")}
              className="flex flex-col space-y-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center cursor-pointer">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Credit/Debit Card
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex items-center cursor-pointer">
                  <Building className="mr-2 h-4 w-4" />
                  Bank Transfer
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                  <Paypal className="mr-2 h-4 w-4" />
                  PayPal
                </Label>
              </div>
            </RadioGroup>

            {/* Card form */}
            {newMethodType === "card" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YYYY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bank transfer form */}
            {newMethodType === "bank" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    name="accountName"
                    placeholder="John Doe"
                    value={formData.accountName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    placeholder="1234567890"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            {/* PayPal form */}
            {newMethodType === "paypal" && (
              <div>
                <Label htmlFor="paypalEmail">PayPal Email</Label>
                <Input
                  id="paypalEmail"
                  name="paypalEmail"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.paypalEmail}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingMethod(false)}>
              Cancel
            </Button>
            <Button onClick={addPaymentMethod}>Add payment method</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentSettings;
