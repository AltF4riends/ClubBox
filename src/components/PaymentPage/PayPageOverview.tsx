
import tngWallet from '../PaymentPage/paymentImage/tngEWallet.png'
import pP from '../PaymentPage/paymentImage/PayPal-Logo-PNG-Picture.png'
import cC from '../PaymentPage/paymentImage/credit-card-logo-black-3.png'
import fpX from '../PaymentPage/paymentImage/fpx-gateway-icon.png'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {CardElement, PaymentElement} from '@stripe/react-stripe-js'
import axios from 'axios'
import { ConfigProvider, Radio } from 'antd'
import { Flex, Segmented } from 'antd';

import { getApp } from "@firebase/app";
import { getStripePayments } from "@stripe/firestore-stripe-payments";
import { getProducts } from "@stripe/firestore-stripe-payments";

const PayPageOverview = () => {

  const app = getApp();
  const payments = getStripePayments(app, {
    productsCollection: "Event",
    customersCollection: "Student",
  });

//useEffect
  const productList = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
    // where: [
    //   ["metadata.type", "==", "books"],
    //   ["metadata.rating", ">=", 4],
    // ], in case need to search 
    //limit: 10, to limit the product displayed
  });
  for (const product of products) {
    product.prices
  }
}

  return (
    <div>
        <div style={{
          display: "flex",
          height: "87vh",
          width: "100vw",
          backgroundColor: "rgba(153,0,0,0.7)",
          justifyContent: "center",
          alignItems: "center",
        }}>

          <form>
          <div style={{
              display: "flex",
              height: "80vh",
              width: "85vw",
              backgroundColor: "rgba(255,255,255,0.7)",
              borderRadius: "45px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap"
            }}>
              <div style={{
                display: "flex",
                height: "25vh",
                width: "50vw",
                backgroundColor: "rgba(255,0,0,0.7)",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: "solid grey 1px"
              }}>
                <ConfigProvider
                    theme={{
                      components: {
                        Segmented: {
                          itemSelectedBg:"#000111",
                        },
                      },
                }}>
                  <Flex gap="large" align="flex-start" vertical >
                    <Segmented 
                      options={[
                        {
                          label: (
                            <div style={{ padding: 4 }}>
                              <img src={tngWallet} style={{height: "100px", width: "100px", minWidth: "100%", minHeight: "100%"}}/>
                            </div>
                          ),
                          value: 'tng', //TNG
                        },
                        {
                          label: (
                            <div style={{ padding: 4 }}>
                              <img src={pP} style={{height: "100px", width: "150px", minWidth: "100%", minHeight: "100%"}}/>
                            </div>
                          ),
                          value: 'PayPal', //Paypal
                        },
                        {
                          label: (
                            <div style={{ padding: 4 }}>
                              <img src={cC} style={{height: "100px", width: "150px", minWidth: "100%", minHeight: "100%"}}/>
                            </div>
                          ),
                          value: 'Bank', //Bank Card
                        },
                        {
                          label: (
                            <div style={{ padding: 4 }}>
                              <img src={fpX} style={{height: "100px", width: "150px", minWidth: "100%", minHeight: "100%"}}/>
                            </div>
                          ),
                          value: 'FPX', //FPX
                        },
                      ]}
                      
                    />
                  </Flex>
                </ConfigProvider>

              </div>

              <div style={{
                display: "flex",
                height: "50vh",
                width: "50vw",
                backgroundColor: "rgba(0,255,0,0.7)",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
                {/*Bank Stuff I assume*/}
                <PaymentElement/>
              </div>

              <div style={{
                display: "flex",
                height: "75vh",
                width: "33vw",
                backgroundColor: "rgba(0,0,255,0.7)",
                borderLeft: "solid grey 1px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <div style={{height: "7vh", width:"28vw", borderBottom: "solid grey 1px"}}><h1>Price Details</h1></div> {/*Inner Title*/}

                <div style={{height: "30vh", width:"28vw", borderBottom: "solid grey 1px"}}> {/*Inner Arraying Payment*/}
                  Array Stuff
                </div>

                <div style={{height: "5vh", width:"28vw", borderBottom: "solid grey 1px"}}>
                  <h3>Total Payment: </h3> {/*Inner Arraying Total*/}
                </div>

                <div style={{display: "flex", height: "8vh", width:"28vw", justifyContent: "center", alignItems: "center",}}> {/*Inner Submit Button*/}
                <button type="submit" className="btn btn-primary btn-lg btn-block">Pay</button>
                </div>
              </div>
            
            </div> {/*Inner White*/}

          </form>

        </div>
    </div>
  )
}

export default PayPageOverview