import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function ProductForm({ shops, categories, onAddProduct }) {
  const [productName, setProductName] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !selectedShop || !selectedCategory) {
      alert("Lütfen tüm alanları doldurunuz...");
      setProductName("");
    setSelectedShop("");
    setSelectedCategory("");
      return;
    }

    onAddProduct({
      name: productName,
      shop: selectedShop,
      category: selectedCategory,
    });

    setProductName("");
    setSelectedShop("");
    setSelectedCategory("");
  };

  return (
    <div className="col-4 mx-auto my-5 text-center">
      <Form onSubmit={handleSubmit}>
        <Form.Control
          className="mb-3 shadow-none"
          type="text"
          placeholder="Ürün Adı"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <Form.Select
          className="mb-3 shadow-none"
          value={selectedShop}
          onChange={(e) => setSelectedShop(e.target.value)}
        >
          <option value="">Mağaza Seçin</option>
          {shops.map((market) => (
            <option key={market.id} value={market.id}>
              {market.name}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          className="mb-3 shadow-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Kategori Seçin</option>
          {categories.map((categori) => (
            <option key={categori.id} value={categori.id}>
              {categori.name}
            </option>
          ))}
        </Form.Select>

        <Button type="submit" variant="primary">
          Ürün Ekle
        </Button>
      </Form>
    </div>
  );
}

export default ProductForm;