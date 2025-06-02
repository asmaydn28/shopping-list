import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import JSConfetti from "js-confetti";
import Fuse from "fuse.js";
import styles from "./App.module.scss";
import ProductForm from "./components/ProductForm";
import FilterSection from "./components/FilterSection";
import ProductTable from "./components/ProductTable";
import shops from "./data/shopsData";
import categories from "./data/categoriesData";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredShopId, setFilteredShopId] = useState("");
  const [filteredCategoryId, setFilteredCategoryId] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [filteredName, setFilteredName] = useState("");
  const [debouncedFilteredName, setDebouncedFilteredName] = useState("");

  const jsConfetti = new JSConfetti();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedFilteredName(filteredName);
    }, 500);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [filteredName]);

  const handleAddProduct = (productData) => {
    const newProduct = {
      id: nanoid(),
      name: productData.name,
      shop: productData.shop,
      category: productData.category,
      isBought: false
    };

    setProducts([...products, newProduct]);
  };

  const handleMarkBought = (productId) => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.map(product => 
        product.id === productId 
          ? { ...product, isBought: !product.isBought } 
          : product
      );
      
      const clickedProduct = prevProducts.find(p => p.id === productId);
      if (!clickedProduct.isBought) {
        const allBought = updatedProducts.every(p => p.isBought);
        if (allBought && updatedProducts.length > 0) {
          setTimeout(() => {
            alert("Alışveriş Tamamlandı!");
            jsConfetti.addConfetti();
          }, 100);
        }
      }
      
      return updatedProducts;
    });
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const fuse = new Fuse(products, {
    keys: ["name"],
    threshold: 0.4,
  });

  const filteredProducts = products.filter(product => {

    if (filteredShopId && product.shop !== filteredShopId) {
      return false;
    }

    if (filteredCategoryId && product.category !== filteredCategoryId) {
      return false;
    }

    if (filteredStatus === "bought" && !product.isBought) {
      return false;
    }
    if (filteredStatus === "notBought" && product.isBought) {
      return false;
    }
    
    if (debouncedFilteredName) {
      const fuseResults = fuse.search(debouncedFilteredName);
      return fuseResults.some(result => result.item.id === product.id);
    }
    
    return true;
  });

  return (
    <div className={styles.appContainer}>
      <div className="h1 text-center pt-3 fw-bold">Alınacaklar Listesi</div>
      
      <ProductForm 
        shops={shops} 
        categories={categories} 
        onAddProduct={handleAddProduct} 
      />

      <FilterSection 
        shops={shops}
        categories={categories}
        filteredShopId={filteredShopId}
        setFilteredShopId={setFilteredShopId}
        filteredCategoryId={filteredCategoryId}
        setFilteredCategoryId={setFilteredCategoryId}
        filteredStatus={filteredStatus}
        setFilteredStatus={setFilteredStatus}
        filteredName={filteredName}
        setFilteredName={setFilteredName}
      />
      
      <ProductTable 
        products={filteredProducts} 
        shops={shops} 
        categories={categories} 
        onMarkBought={handleMarkBought} 
        onDeleteProduct={handleDeleteProduct} 
      />
    </div>
  );
}

export default App;