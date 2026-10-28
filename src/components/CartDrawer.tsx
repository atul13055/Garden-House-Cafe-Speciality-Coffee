import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  CheckCircle2,
  MapPin,
  Clock,
  CreditCard,
  Send,
  RotateCcw,
} from 'lucide-react';
import { MenuItem, VENUE_INFO } from '../data/cafeData';
import { MenuArtwork } from './MenuArtwork';

export interface CartItem {
  item: MenuItem;
  quantity: number;
  note?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

type FulfillmentMode =
  | 'Dine-in (5th Floor Table)'
  | 'Takeaway (Quick Pickup)'
  | 'Delivery (Al Reem Island)'
  | 'No-contact delivery';

type PaymentOption = 'Credit / Debit Card' | 'NFC Mobile Payment' | 'Cash on Delivery / Pickup';

interface ConfirmedReceipt {
  orderNumber: string;
  timestamp: string;
  customerName: string;
  phone: string;
  locationNote: string;
  fulfillment: FulfillmentMode;
  payment: PaymentOption;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [fulfillment, setFulfillment] = useState<FulfillmentMode>('Dine-in (5th Floor Table)');
  const [payment, setPayment] = useState<PaymentOption>('NFC Mobile Payment');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('+971 ');
  const [locationNote, setLocationNote] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmedReceipt, setConfirmedReceipt] = useState<ConfirmedReceipt | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, entry) => acc + entry.item.price * entry.quantity, 0);
  const isDelivery =
    fulfillment === 'Delivery (Al Reem Island)' || fulfillment === 'No-contact delivery';
  const deliveryFee = isDelivery && subtotal > 0 && subtotal < 50 ? 5 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (customerName.trim().length < 2) {
      setFormError('Please enter your name for the order receipt.');
      return;
    }
    const cleanedPhone = phone.replace(/\s+/g, '');
    if (cleanedPhone.length < 8) {
      setFormError('Please enter a valid contact phone number.');
      return;
    }

    setFormError('');
    const orderNum = `GHC-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const receipt: ConfirmedReceipt = {
      orderNumber: orderNum,
      timestamp: `Today at ${nowStr}`,
      customerName: customerName.trim(),
      phone: phone.trim(),
      locationNote:
        locationNote.trim() ||
        (isDelivery ? 'The Arc Tower / Gate District' : '5th Floor Poolside & Cafe Lounge'),
      fulfillment,
      payment,
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
    };

    setConfirmedReceipt(receipt);
    onClearCart();
  };

  const buildWhatsAppShareUrl = (receipt: ConfirmedReceipt) => {
    const lines = [
      `Hello Garden House Cafe! Here is my confirmed order ${receipt.orderNumber}:`,
      ...receipt.items.map(
        (c) => `- ${c.quantity}x ${c.item.name} (dh ${(c.item.price * c.quantity).toFixed(2)})`
      ),
      `Total: dh ${receipt.total.toFixed(2)}`,
      `Service: ${receipt.fulfillment}`,
      `Payment: ${receipt.payment}`,
      `Name: ${receipt.customerName} (${receipt.phone})`,
      `Note: ${receipt.locationNote}`,
    ];
    return `${VENUE_INFO.whatsappDirectUrl}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Order Cart & Checkout"
    >
      <div className="relative w-full max-w-lg bg-[#FAF8F5] h-full flex flex-col shadow-2xl border-l border-[#E3E7E1]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E3E7E1]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#5E7159]" />
            <h2 className="text-xl font-display font-semibold text-[#231F1D]">
              {confirmedReceipt ? 'Order Confirmation Receipt' : 'Your Garden House Order'}
            </h2>
          </div>
          <button
            onClick={() => {
              onClose();
            }}
            className="p-2 text-[#5C645A] hover:text-[#231F1D] rounded-lg hover:bg-[#EFF2EE] transition-colors"
            aria-label="Close Order Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {confirmedReceipt ? (
            <div className="bg-white border border-[#E3E7E1] rounded-xl p-6 space-y-5">
              <div className="flex items-start gap-3.5 pb-4 border-b border-[#E3E7E1]">
                <CheckCircle2 className="w-8 h-8 text-[#5E7159] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-mono-tabular text-[#5E7159] font-semibold">
                    ORDER #{confirmedReceipt.orderNumber} · CONFIRMED
                  </p>
                  <h3 className="text-2xl font-display font-semibold text-[#231F1D] mt-0.5">
                    Thank you, {confirmedReceipt.customerName}!
                  </h3>
                  <p className="text-xs text-[#5C645A] mt-1">
                    Placed {confirmedReceipt.timestamp} · Estimated prep time: 12–18 mins
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#5C645A] bg-[#EFF2EE] p-4 rounded-lg">
                <div className="flex justify-between">
                  <span>Service Option:</span>
                  <span className="font-medium text-[#231F1D]">{confirmedReceipt.fulfillment}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location / Table:</span>
                  <span className="font-medium text-[#231F1D]">{confirmedReceipt.locationNote}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-medium text-[#231F1D]">{confirmedReceipt.payment}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact Phone:</span>
                  <span className="font-mono-tabular font-medium text-[#231F1D]">
                    {confirmedReceipt.phone}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-semibold text-[#5C645A]">Itemized Summary</h4>
                <div className="divide-y divide-[#E3E7E1]">
                  {confirmedReceipt.items.map((entry) => (
                    <div
                      key={entry.item.id}
                      className="py-2.5 flex items-center justify-between text-sm"
                    >
                      <div>
                        <span className="font-mono-tabular font-semibold text-[#5E7159] mr-2">
                          {entry.quantity}×
                        </span>
                        <span className="font-medium text-[#231F1D]">{entry.item.name}</span>
                      </div>
                      <span className="font-mono-tabular text-[#231F1D]">
                        dh {(entry.item.price * entry.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E3E7E1] space-y-1.5 text-sm">
                <div className="flex justify-between text-[#5C645A]">
                  <span>Subtotal</span>
                  <span className="font-mono-tabular">
                    dh {confirmedReceipt.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#5C645A]">
                  <span>Service / Delivery Fee</span>
                  <span className="font-mono-tabular">
                    {confirmedReceipt.deliveryFee === 0
                      ? 'Free (dh 0.00)'
                      : `dh ${confirmedReceipt.deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#231F1D] pt-2 border-t border-[#E3E7E1]">
                  <span>Total Amount (AED)</span>
                  <span className="font-mono-tabular text-[#5E7159]">
                    dh {confirmedReceipt.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="pt-3 space-y-2.5">
                <a
                  href={buildWhatsAppShareUrl(confirmedReceipt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-[#5E7159] hover:bg-[#4D5E49] rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send Copy to Cafe WhatsApp (+971 58 283 5070)
                </a>
                <button
                  onClick={() => setConfirmedReceipt(null)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-[#231F1D] bg-[#EFF2EE] hover:bg-[#E3E7E1] rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Start Another Order
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-14 px-4 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#EFF2EE] flex items-center justify-center text-[#5E7159]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-display font-semibold text-[#231F1D]">
                  Your order bag is empty
                </h3>
                <p className="text-sm text-[#5C645A] max-w-xs mx-auto">
                  Explore our 18 menu categories—from Iced Pistachio Lattes and Pistachio Croissants
                  to Egg Benedict with Avocado.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-medium text-white bg-[#5E7159] hover:bg-[#4D5E49] rounded-lg transition-colors"
              >
                Browse Full Menu
              </button>
            </div>
          ) : (
            <>
              {/* Itemized List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#5C645A]">
                    Selected Items ({cart.reduce((s, c) => s + c.quantity, 0)})
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-xs text-[#5C645A] hover:text-red-700 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3.5 p-3 bg-white border border-[#E3E7E1] rounded-lg"
                  >
                    <MenuArtwork
                      type={item.artworkType}
                      name={item.name}
                      className="w-16 h-14 rounded-md shrink-0 border border-[#E3E7E1]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#231F1D] truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#5C645A]">
                        {item.category} ·{' '}
                        <span className="font-mono-tabular font-medium text-[#5E7159]">
                          dh {item.price.toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-md bg-[#EFF2EE] hover:bg-[#E3E7E1] flex items-center justify-center text-[#231F1D] transition-colors"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-mono-tabular font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-md bg-[#EFF2EE] hover:bg-[#E3E7E1] flex items-center justify-center text-[#231F1D] transition-colors"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-[#5C645A] hover:text-red-700 transition-colors ml-1"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Mode Selection */}
              <form id="local-checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="bg-white border border-[#E3E7E1] rounded-lg p-4 space-y-3">
                  <label className="block text-xs font-semibold text-[#231F1D]">
                    1. Choose Service Option
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        'Dine-in (5th Floor Table)',
                        'Takeaway (Quick Pickup)',
                        'Delivery (Al Reem Island)',
                        'No-contact delivery',
                      ] as FulfillmentMode[]
                    ).map((mode) => (
                      <button
                        type="button"
                        key={mode}
                        onClick={() => setFulfillment(mode)}
                        className={`px-3 py-2 text-left text-xs font-medium rounded-md border transition-colors ${
                          fulfillment === mode
                            ? 'bg-[#5E7159] text-white border-[#5E7159]'
                            : 'bg-[#FAF8F5] text-[#231F1D] border-[#E3E7E1] hover:bg-[#EFF2EE]'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guest Details */}
                <div className="bg-white border border-[#E3E7E1] rounded-lg p-4 space-y-3">
                  <label className="block text-xs font-semibold text-[#231F1D]">
                    2. Guest & Table / Tower Details
                  </label>
                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-xs text-[#5C645A] mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g.,Tariq Al Nahyan"
                        className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E3E7E1] rounded-md focus:outline-none focus:border-[#5E7159]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#5C645A] mb-1">
                        UAE Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+971 58 283 5070"
                        className="w-full px-3 py-2 text-sm font-mono-tabular bg-[#FAF8F5] border border-[#E3E7E1] rounded-md focus:outline-none focus:border-[#5E7159]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#5C645A] mb-1">
                        {isDelivery
                          ? 'Tower, Floor & Apartment (The Arc / Gate Towers)'
                          : 'Table Preference (e.g., Poolside Terrace or Indoor Study)'}
                      </label>
                      <input
                        type="text"
                        value={locationNote}
                        onChange={(e) => setLocationNote(e.target.value)}
                        placeholder={
                          isDelivery
                            ? 'e.g., The Arc Tower, Floor 14, Apt 1408'
                            : 'e.g., Poolside table near garden palms'
                        }
                        className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E3E7E1] rounded-md focus:outline-none focus:border-[#5E7159]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#5C645A] mb-1">
                        Dietary or Preparation Notes (Optional)
                      </label>
                      <input
                        type="text"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="e.g., Less ice, oat milk, extra honey on side"
                        className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E3E7E1] rounded-md focus:outline-none focus:border-[#5E7159]"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white border border-[#E3E7E1] rounded-lg p-4 space-y-2.5">
                  <label className="block text-xs font-semibold text-[#231F1D]">
                    3. Payment Method (Accepted On-Site & Delivery)
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {(
                      [
                        'NFC Mobile Payment',
                        'Credit / Debit Card',
                        'Cash on Delivery / Pickup',
                      ] as PaymentOption[]
                    ).map((pay) => (
                      <button
                        type="button"
                        key={pay}
                        onClick={() => setPayment(pay)}
                        className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
                          payment === pay
                            ? 'bg-[#EFF2EE] text-[#231F1D] border-[#5E7159]'
                            : 'bg-[#FAF8F5] text-[#5C645A] border-[#E3E7E1]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <CreditCard className="w-3.5 h-3.5 text-[#5E7159]" />
                          {pay}
                        </span>
                        {payment === pay && (
                          <span className="text-[#5E7159] font-semibold">Selected</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {formError && (
                  <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                    {formError}
                  </p>
                )}
              </form>
            </>
          )}
        </div>

        {/* Footer Totals & Submit */}
        {!confirmedReceipt && cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#E3E7E1] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#5C645A]">
                <span>Subtotal</span>
                <span className="font-mono-tabular">dh {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#5C645A]">
                <span>
                  {isDelivery ? 'Al Reem Delivery (Free over dh 50)' : '5th Floor Service Charge'}
                </span>
                <span className="font-mono-tabular">
                  {deliveryFee === 0 ? 'Free (dh 0.00)' : `dh ${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#231F1D] pt-2 border-t border-[#E3E7E1]">
                <span>Total (AED)</span>
                <span className="font-mono-tabular text-[#5E7159]">dh {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="local-checkout-form"
              className="w-full py-3 px-4 bg-[#5E7159] hover:bg-[#4D5E49] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Confirm Order · dh {total.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
