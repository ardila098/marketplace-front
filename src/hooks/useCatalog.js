import { useState, useEffect, useCallback } from 'react';
import { catalogService } from '../services/catalogService';

const useCatalog = (initialParams = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await catalogService.getProductsCatalog(initialParams);


            setProducts(response.data || []);
        } catch (err) {
            console.error("Erro al cargar catalogo", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(initialParams)]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    return {
        products,
        loading,
        error,
        refetch: fetchProducts
    };
};

export default useCatalog;
