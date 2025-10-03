import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export interface Data {
  _id: string
  name: string
}

interface ProductStore {
  brands: Data[]
  categories: Data[]
  setBrands: (brands: Data[]) => void
  setCategories: (categories: Data[]) => void
  clearStore: () => void
}

const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      brands: [],
      categories: [],
      setBrands: (brands) => set({ brands }),
      setCategories: (categories) => set({ categories }),
      clearStore: () => set({ brands: [], categories: [] }),
    }),
    {
      name: "product-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useProductStore
