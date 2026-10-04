import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, PRODUCTS } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type ViewType = 'beranda' | 'katalog' | 'detail';

interface AppContextType {
  currentView: ViewType;
  selectedCategory: string;
  selectedProductId: string;
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  wishlist: string[];
  searchQuery: string;
  toast: { title: string; subtitle: string; visible: boolean } | null;
  isResellerModalOpen: boolean;
  isWholesaleChatOpen: boolean;
  setCurrentView: (view: ViewType) => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedProductId: (id: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setIsResellerModalOpen: (open: boolean) => void;
  setIsWholesaleChatOpen: (open: boolean) => void;
  navigateTo: (view: ViewType, categoryId?: string, productId?: string) => void;
  addToCart: (product: Product, quantity?: number, color?: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  showToast: (title: string, subtitle: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('beranda');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProductId, setSelectedProductId] = useState<string>('daisy-red');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(['daisy-red', 'pta-holo-38']);
  const [searchQuery, setSearchQuery] = useState('');
  const [isResellerModalOpen, setIsResellerModalOpen] = useState(false);
  const [isWholesaleChatOpen, setIsWholesaleChatOpen] = useState(false);
  const [toast, setToast] = useState<{ title: string; subtitle: string; visible: boolean } | null>(null);

  // Initialize with 3 items as depicted by badge 3 in mockup!
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Daisy Red
      quantity: 5,
      selectedColor: 'Merah (RED)'
    },
    {
      product: PRODUCTS[1], // Cellophane Tiffany Blue
      quantity: 2,
      selectedColor: 'Tiffany Blue'
    },
    {
      product: PRODUCTS[3], // Pita Hologram
      quantity: 1,
      selectedColor: 'Purple Hologram'
    }
  ]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const showToast = (title: string, subtitle: string) => {
    setToast({ title, subtitle, visible: true });
    setTimeout(() => {
      setToast(prev => (prev ? { ...prev, visible: false } : null));
    }, 3200);
  };

  const addToCart = (product: Product, quantity = 1, color?: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && (!color || item.selectedColor === color));
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && (!color || item.selectedColor === color)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: color || product.colors[0]?.name
        }
      ];
    });
    showToast('Berhasil Ditambahkan!', `${product.name} (${quantity} ${product.unit}) masuk keranjang belanja.`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Dihapus dari Wishlist', 'Produk telah dikeluarkan dari daftar favorit Anda.');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Disimpan ke Wishlist', 'Produk ditambahkan ke daftar favorit tersimpan.');
        return [...prev, productId];
      }
    });
  };

  const navigateTo = (view: ViewType, categoryId?: string, productId?: string) => {
    setCurrentView(view);
    if (categoryId) setSelectedCategory(categoryId);
    if (productId) setSelectedProductId(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        selectedCategory,
        selectedProductId,
        cartItems,
        cartCount,
        cartTotal,
        isCartOpen,
        wishlist,
        searchQuery,
        toast,
        isResellerModalOpen,
        isWholesaleChatOpen,
        setCurrentView,
        setSelectedCategory,
        setSelectedProductId,
        setIsCartOpen,
        setSearchQuery,
        setIsResellerModalOpen,
        setIsWholesaleChatOpen,
        navigateTo,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        toggleWishlist,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
