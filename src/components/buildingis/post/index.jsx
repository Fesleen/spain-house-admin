import React, { useEffect, useRef, useState } from "react";
import CommonBtn from "../../common/CommonBtn";
import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { useDispatch, useSelector } from "react-redux";
import { ProductPost, ProductGet, UploadImage } from "../../../redux/products/index";
import { CategoryGet } from "../../../redux/category/index";
import { Row, Col } from "react-grid-system";
import SelectCommon from "../../common/select/index";
import "./styles.css";
import { Spin } from "antd";

function ProductAddForm({ Open, HandleClose, setSelectId, selectId }) {
  const dispatch = useDispatch();
  const titleUz = useRef();
  const titleRu = useRef();
  const titleEn = useRef();
  const productTypeUz = useRef();
  const productTypeRu = useRef();
  const productTypeEn = useRef();

  // category get
  const categoryGets = useSelector((state) => state.category.categoryGet.data);
  useEffect(() => {
    dispatch(CategoryGet());
  }, []);
  const HandleChange = async (e) => {
    await dispatch(UploadImage(e));
  };
  // category get
  const dataProduct = useSelector((state) => state.product?.uploadProduct);
  // product post
  const productPost = useSelector((state) => state.product);
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
    await dispatch(ProductPost(body));
    dispatch(ProductGet());
  };
  if (productPost.productPost.Success == true) {
    HandleClose();
    window.location.reload();
  }

  const options = [];
  categoryGets.map((elem) =>
    options.push({
      value: elem.id,
      label: elem.title_ru,
    })
  );
  // product post
  return (
    <ModalCommon width={550} height={400} open={Open} handleClose={HandleClose}>
      <>
        <Wrapper onSubmit={HandleSubmit}>
          <h3>Добавить продукт</h3>

          <div className="input_wrap">
            <div className="scrool">
              <Row className="row">
                <Col className="col" lg={12}>
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
                </Col>
                <Col className="col" lg={12}>
                  <div className="selects">
                    <SelectCommon
                      onChange={(e) => setSelectId(e)}
                      placeholder="Select"
                      options={options}
                    />
                  </div>
                </Col>

                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Имя узб..."
                    required
                    ref={titleUz}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Имя русский..."
                    required
                    ref={titleRu}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Имя енг..."
                    required
                    ref={titleEn}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Тип продукта узб..."
                    required
                    ref={productTypeUz}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Тип продукта русский..."
                    required
                    ref={productTypeRu}
                  />
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="text"
                    placeholder="Тип продукта енг..."
                    required
                    ref={productTypeEn}
                  />
                  </Col>
              </Row>
              <CommonBtn
                type="submit"
                style={{
                  margin: "20px auto 0 auto",
                  padding: "12px 40px",
                  border: "2px solid #fff",
                }}
              >
                Добавить
              </CommonBtn>
            </div>
          </div>
        </Wrapper>
      </>
    </ModalCommon>
  );
}

export default ProductAddForm;
