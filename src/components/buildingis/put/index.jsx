import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { Row, Col } from "react-grid-system";
import CommonBtn from "../../common/CommonBtn";
import "./styles.css";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductPut, ProductGet, UploadImage } from "../../../redux/products";
import { CategoryGet } from "../../../redux/category/index";
import SelectCommon from "../../common/select/index";
import { Spin } from "antd";

function Put({ openPut, handleClosePut, put_id, setSelectId, selectId }) {
  const ids = put_id;
  const dispatch = useDispatch();
  const titleUz = useRef();
  const titleRu = useRef();
  const titleEn = useRef();
  const productTypeUz = useRef();
  const productTypeRu = useRef();
  const productTypeEn = useRef();

  const productPut = useSelector((state) => state.product);
  // product get
  const productGets = useSelector((state) => state.product.productGet.data);
  useEffect(() => {
    dispatch(ProductGet());
  }, []);
  // product get
  // category get
  const categoryGets = useSelector((state) => state.category.categoryGet.data);
  const dataProduct = useSelector((state) => state.product?.uploadProduct);
  useEffect(() => {
    dispatch(CategoryGet());
  }, []);
  // category get
  const handleSelect = (e) => {
    setSelectId(e.currentTarget.value);
  };
  const HandleChange = async (e) => {
    await dispatch(UploadImage(e));
  };
  const options = [];
  categoryGets.map((elem) =>
    options.push({
      value: elem.id,
      label: elem.title_ru,
    })
  );

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title_uz: titleUz.current.value,
      title_ru: titleRu.current.value,
      title_en: titleEn.current.value,
      description_uz: productTypeUz.current.value,
      description_ru: productTypeRu.current.value,
      description_en: productTypeEn.current.value,
      image : dataProduct.data,
      category: selectId,
    };

    await dispatch(ProductPut({ body, id: ids }));
    dispatch(ProductGet());
  };
  if (productPut.productPut.Success == true) {
    handleClosePut();
    window.location.reload();
  }
  return (
    <>
      <ModalCommon
        width={600}
        height={550}
        open={openPut}
        handleClose={handleClosePut}
      >
        <Wrapper onSubmit={HandleSubmit}>
          <h3>Изменить продукт</h3>
          {dataProduct.Loading == true ? (
            <div className="spins">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <input type="file" id="file" onChange={HandleChange} />
              <label for="file" class="custom-file-upload">
                <span className="span-download">
                  <ion-icon name="cloud-download-outline"></ion-icon>
                </span>
              </label>
            </>
          )}
          <div className="input_wrap">
            <div className="scrool">
              {productGets.map((elem) =>
                elem.id == put_id ? (
                  <>
                    <Row className="row">
                      <Col className="col" lg={12}>
                        <div className="selects">
                          <SelectCommon
                            onChange={(e) => setSelectId(e)}
                            defaultValue="Select"
                            options={options}
                          />
                        </div>
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.title_uz}
                          ref={titleUz}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.title_ru}
                          ref={titleRu}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.title_en}
                          ref={titleEn}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.description_ru}
                          ref={productTypeRu}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.description_uz}
                          ref={productTypeUz}
                        />
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="text"
                          defaultValue={elem.description_en}
                          ref={productTypeEn}
                        />
                      </Col>
                    </Row>
                  </>
                ) : null
              )}

              <CommonBtn
                type="submit"
                style={{
                  margin: "20px auto 0 auto",
                  padding: "12px 40px",
                  border: "2px solid #fff",
                }}
              >
                Изменить
              </CommonBtn>
            </div>
          </div>
        </Wrapper>
      </ModalCommon>
    </>
  );
}
export default Put;
