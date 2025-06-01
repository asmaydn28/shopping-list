import { Button, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

function ProductTable({ 
  products, 
  shops, 
  categories, 
  onMarkBought, 
  onDeleteProduct 
}) {
  return (
    <div className="table-responsive container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>İD</th>
            <th>Ürün Adı</th>
            <th>Market</th>
            <th>Kategori</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              onClick={() => onMarkBought(product.id)}
              style={{
                textDecoration: product.isBought ? "line-through" : "none",
                cursor: "pointer",
                backgroundColor: product.isBought ? "#f0f0f0" : "inherit",
              }}
            >
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                {product.shop}-{shops.find((s) => s.id == product.shop)?.name}
              </td>
              <td>
                {product.category}
                {categories.find((c) => c.id == product.category)?.name}
              </td>
              <td>
                <Button
                  variant="danger"
                  className="p-2 d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "4px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteProduct(product.id);
                  }}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductTable;