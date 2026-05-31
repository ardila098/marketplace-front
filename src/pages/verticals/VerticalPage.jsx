import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Spin, Empty, Button } from "antd"
import VerticalHeader from "./components/VerticalHeader"
import VerticalProductsGrid from "./components/VerticalProductsGrid"
import useVerticals from "./hooks/useVerticals"
import useCatalog from "../../hooks/useCatalog"
import { PageContainer } from "./styles/styleVerticalPage";




const VerticalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getVertical, dataVertical, loading: loadingVertical } = useVerticals(id);
  const { products, loading: loadingProducts } = useCatalog({ vertical: id });
  useEffect(() => {
    if (id) {
      getVertical();
    }
  }, [id, getVertical]);
  if (loadingVertical && !dataVertical) {
    return (
      <PageContainer style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Spin size="large" tip="Cargando categoría..." />
      </PageContainer>
    );
  }
  if (!dataVertical) {
    return (
      <PageContainer>
        <Empty
          description="No pudimos encontrar la vertical seleccionada"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button type="primary" onClick={() => navigate("/verticals")}>
            Volver a Verticales
          </Button>
        </Empty>
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <VerticalHeader
        dataVertical={dataVertical}
        loadingProducts={loadingProducts}
        productsCount={products.length}
      />
      <VerticalProductsGrid
        products={products}
        loadingProducts={loadingProducts}
      />
    </PageContainer>
  );
};
export default VerticalPage;