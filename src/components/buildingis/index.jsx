import { useState } from "react";
import { useDispatch } from "react-redux";
import { ProductDelete, ProductPut } from "../../redux/products/index";
import Delete from "./delete";
import ProductAddForm from "./post";
import Put from "./put";
import TableAdd from "./table";
function ProductsComponent({ open, handleClose }) {
  const dispatch = useDispatch();
  const [selectId, setSelectId] = useState(null);
  const [productId, setProductId] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleDeleteModal = (e) => {
    setProductId(e.target.id);
    setOpenDelete(true);
  };

  const [openPut, setOpenPut] = useState(false);
  const handleClosePut = () => setOpenPut(false);
  const handlePutModal = (e) => {
    setProductId(e.currentTarget.id);
    setOpenPut(true);
  };
  const HandleDelete = () => {
    dispatch(ProductDelete(productId));
  };

  return (
    <>
      <ProductAddForm
        setSelectId={setSelectId}
        selectId={selectId}
        Open={open}
        HandleClose={handleClose}
      />
      <TableAdd onClickDelete={handleDeleteModal} onClickPut={handlePutModal} />
      <Delete
        productId={productId}
        HandleDelete={HandleDelete}
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
      />
      <Put
        setSelectId={setSelectId}
        selectId={selectId}
        put_id={productId}
        openPut={openPut}
        handleClosePut={handleClosePut}
      />
    </>
  );
}

export default ProductsComponent;
