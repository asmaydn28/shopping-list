import { Form, Row, Col } from "react-bootstrap";

function FilterSection({
  shops,
  categories,
  filteredShopId,
  setFilteredShopId,
  filteredCategoryId,
  setFilteredCategoryId,
  filteredStatus,
  setFilteredStatus,
  filteredName,
  setFilteredName,
}) {
  return (
    <div className="w-50 mx-auto text-center fw-semibold">
      <h4 className="mb-3">Filtreler</h4>
      <Row>
        <Col md={6} className="mb-2">
          <Form.Group>
            <Form.Label>Market Filtresi</Form.Label>
            <Form.Select
              value={filteredShopId}
              onChange={(e) => setFilteredShopId(e.target.value)}
            >
              <option value="">Tüm Marketler</option>
              {shops.map((market) => (
                <option key={market.id} value={market.id}>
                  {market.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6} className="mb-2">
          <Form.Group>
            <Form.Label>Kategori Filtresi</Form.Label>
            <Form.Select
              value={filteredCategoryId}
              onChange={(e) => setFilteredCategoryId(e.target.value)}
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-2">
          <Form.Group>
            <Form.Label>Durum Filtresi</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                id="status-all"
                label="Tümü"
                name="status"
                value="all"
                checked={filteredStatus === "all"}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />
              <Form.Check
                inline
                type="radio"
                id="status-bought"
                label="Satın Alınanlar"
                name="status"
                value="bought"
                checked={filteredStatus === "bought"}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />
              <Form.Check
                inline
                type="radio"
                id="status-notBought"
                label="Satın Alınmayanlar"
                name="status"
                value="notBought"
                checked={filteredStatus === "notBought"}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />
            </div>
          </Form.Group>
        </Col>

        <Col md={6} className="mb-2">
          <Form.Group>
            <Form.Label>Ürün Adı Filtresi</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ürün Ara"
              value={filteredName}
              onChange={(e) => setFilteredName(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default FilterSection;