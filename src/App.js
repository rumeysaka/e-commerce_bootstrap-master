import './App.css'
import { useState, useEffect, useLayoutEffect } from 'react'
import { commerce } from './lib/commerce'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './components/Hompage/Products'
import Navigation from './components/Navbar/Navigation'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import Footer from './components/Footer/Footer'
import Sidebar from './components/Sidebar/Sidebar'
import OrderHistory from './components/OrderHistory/OrderHistory'
import Favorties from './components/Favorites/Favorties'
import { LoginContext } from './LoginContext'
import Details from './components/Details/Details'
import Sign from './components/Login/Sign.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import fire from './components/Login/fire.js'
import { OrderContext } from './OrderContext'
import { CartContext } from './cartContext'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState([])
  const [payment, setPayment] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const [favList, setFavList] = useState([])
  const [fav, setFav] = useState(null)
  const [user, setUser] = useState(false)

  const fetchProducts = async () => {
    commerce.products
      .list()
      .then((products) => {
        setProducts(products.data)
      })
      .catch((error) => {
        console.log('There was an error fetching the products', error)
      })
  }
  console.log(order)

  const fetchCart = () => {
    commerce.cart
      .retrieve()
      .then((cart) => {
        setCart(cart)
      })
      .catch((error) => {
        console.log('There was an error fetching the cart', error)
      })
  }
  const AddToCart = (productId, quantity) => {
    commerce.cart
      .add(productId, quantity)
      .then((item) => {
        setCart(item.cart)
      })
      .catch((error) => {
        console.error('There was an error adding the item to the cart', error)
      })
  }
  const handleUpdateCartQty = (lineItemId, quantity) => {
    commerce.cart
      .update(lineItemId, { quantity })
      .then((resp) => {
        setCart(resp.cart)
      })
      .catch((error) => {
        console.log('There was an error updating the cart items', error)
      })
  }
  const handleRemoveFromCart = (lineItemId) => {
    commerce.cart
      .remove(lineItemId)
      .then((resp) => {
        setCart(resp.cart)
      })
      .catch((error) => {
        console.error('There was an error removing the item from the cart', error)
      })
  }
  const handleEmptyCart = () => {
    commerce.cart
      .empty()
      .then((resp) => {
        setCart(resp.cart)
      })
      .catch((error) => {
        console.error('There was an error emptying the cart', error)
      })
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()

    setCart(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      refreshCart()
    } catch (error) {
      setErrorMessage(error.data.error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  console.log('cart', cart)

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser('')
      }
    })
  }

  const handleLogout = () => {
    fire.auth().signOut()
    // navigate("/")

    // navigate("../success", { replace: true });
  }
  useEffect(() => {
    authListener()
  }, [])

  useLayoutEffect(() => {
    handleFav()
  }, [])

  const handleFav = (id) => {
    const NewFavList = products.filter((item) => item.id === id)
    NewFavList.map((index) => {
      index.fav = true
    })
    let temp = [...favList].concat(NewFavList)
    let pp = temp.filter((ele, ind) => ind === temp.findIndex((elem) => elem.id === ele.id))
    setFavList(pp)
    console.log(favList)
  }

  const handleDelete = (id) => {
    const updatedFav = [...favList].filter((item) => item.id !== id)
    setFavList(updatedFav)
    console.log('deleted')
    console.log(favList)
  }
  function handleDeleteAll() {
    const updatedFav = []
    // setFavList(updatedFav)
    setFavList([])
  }

  useEffect(() => {
    const temp = localStorage.getItem('payment')
    const loadOrder = JSON.parse(temp)
    if (loadOrder) {
      setPayment(loadOrder)
    }
  }, [])

  useEffect(() => {
    const temp = JSON.stringify(payment)
    localStorage.setItem('payment', temp)
  }, [payment])

  useEffect(() => {
    const temp = localStorage.getItem('order')
    const loadOrder = JSON.parse(temp)
    if (loadOrder) {
      setOrder(loadOrder)
    }
  }, [])

  useEffect(() => {
    const temp = JSON.stringify(order)
    localStorage.setItem('order', temp)
  }, [order])

  useEffect(() => {
    const temp = localStorage.getItem('favList')
    const loadFavList = JSON.parse(temp)
    if (loadFavList) {
      setFavList(loadFavList)
    }
  }, [])

  useEffect(() => {
    const temp = JSON.stringify(favList)
    localStorage.setItem('favList', temp)
  }, [favList])

  useEffect(() => {
    const temp = localStorage.getItem('fav')
    const loadFav = JSON.parse(temp)
    if (loadFav) {
      setFavList(loadFav)
    }
  }, [])

  useEffect(() => {
    const temp = JSON.stringify(fav)
    localStorage.setItem('fav', temp)
  }, [fav])
  return (
    <div>
      <BrowserRouter>
        <LoginContext.Provider value={{ user, setUser }}>
          <CartContext.Provider value={{ cart, setCart }}>
            <OrderContext.Provider value={{ order, setOrder, payment, setPayment, refreshCart }}>
              <Navigation cart={cart} user={user} handleLogout={handleLogout} />
              <div className='d-flex justify-content-space-between'>
                <Sidebar user={user} />
                <Routes>
                  <Route
                    path='/'
                    element={
                      <Products products={products} AddToCart={AddToCart} onHandleFav={handleFav} />
                    }
                  />
                  <Route
                    path='/cart'
                    element={
                      <Cart
                        cart={cart}
                        EmptyCart={handleEmptyCart}
                        UpdateCartQty={handleUpdateCartQty}
                        RemoveFromCart={handleRemoveFromCart}
                      />
                    }
                  />
                  {user && (
                    <Route
                      path='/favorites'
                      element={
                        <Favorties
                          products={products}
                          favList={favList}
                          onHandleDelete={handleDelete}
                          onDeleteAll={handleDeleteAll}
                          onHandleFav={handleFav}
                          onAddToCart={AddToCart}
                        />
                      }
                    />
                  )}
                  <Route
                    path='/checkout'
                    element={
                      <Checkout
                        cart={cart}
                        order={order}
                        onCaptureCheckout={handleCaptureCheckout}
                        error={errorMessage}
                      />
                    }
                  />
                  {user && <Route path='/order-history' element={<OrderHistory />} />}
                  <Route path='/sign' element={<Sign />} />
                  <Route
                    exact
                    path='/:id'
                    element={
                      <Details products={products} handleFav={handleFav} onAddToCart={AddToCart} />
                    }
                  />
                </Routes>
              </div>
            </OrderContext.Provider>
          </CartContext.Provider>
        </LoginContext.Provider>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  )
}

export default App
