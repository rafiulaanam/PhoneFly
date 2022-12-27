const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.REACT_APP_stripe_security_key);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_KEY}@cluster0.qdm6nzz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(403).json({
        status: 403,
        message: "Forbidden",
      });
    }
    req.decoded = decoded;
    next();
  });
}
async function run() {
  const usersCollection = await client.db("photoFly").collection("users");
  const productsCollection = await client.db("photoFly").collection("products");
  const categoriesCollection = await client
    .db("photoFly")
    .collection("categories");
  const blogsCollection = await client.db("photoFly").collection("blogs");
  const bookingsCollection = await client.db("photoFly").collection("bookings");
  const paymentsCollection = await client.db("photoFly").collection("payments");

  //==================================Start Hooks API===================================
  //Admin Api
  app.get("/users/admin/:email", async (req, res) => {
    const email = req.params.email;
    const users = await usersCollection.findOne({ email: email });
    res.send({ isAdmin: users?.role === "Admin" });
  });
  //Seller Api
  app.get("/users/seller/:email", async (req, res) => {
    const email = req.params.email;
    const users = await usersCollection.findOne({ email: email });
    res.send({ isSeller: users?.role === "Seller" });
  });
  //Buyer Api
  app.get("/users/buyer/:email", async (req, res) => {
    const email = req.params.email;
    const users = await usersCollection.findOne({ email: email });
    res.send({ isBuyer: users?.role === "Buyer" });
  });

  //------------------------------------End Hooks API-------------------------------------

  //==================================Start Users======================================
  app.get("/users", async (req, res) => {
    const role = req.query.role;
    const result = await usersCollection.find({ role: role }).toArray();
    res.send(result);
  });
  
  app.post("/users", async (req, res) => {
    const users = req.body;
    const query = { email: users.email };
    const queryResult = await usersCollection.findOne(query);
    if (queryResult) {
      return res.status(403).send({
        status: 403,
        message: "Forbidden",
      });
    }
    const result = await usersCollection.insertOne(users);
    res.send(result);
  });

  app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const filler = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updatedData = {
      $set: {
        identity: "Verified",
      },
    };
    const result = await usersCollection.updateOne(
      filler,
      updatedData,
      options
    );
    res.send(result);
  });
  app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    const result = await usersCollection.deleteOne({ _id: ObjectId(id) });
    res.send(result);
  });
  //------------------------------------End Users-------------------------------------

  //==================================Start Booking===================================
  app.get("/bookings", async (req, res) => {
    const email = req.query.email;

    const query = {
      email: email,
      status: "Booked",
    };
    const result = await bookingsCollection.find(query).toArray();
    res.send(result);
  });

  app.post("/bookings", async (req, res) => {
    const bookData = req.body;
    const id = bookData.productId

    const query = {_id:ObjectId(id)}
    const updateQuery = {
      $set: {
        status: "Booked",
      }
    }
const update = await productsCollection.updateOne(query, updateQuery)


    const result = await bookingsCollection.insertOne(bookData);
    res.send(result);   
  });

  app.get("/reports", async (req, res) => {
    const query = {
      item_status: "Reported",
    };
    const result = await productsCollection.find(query).toArray();
    res.send(result);
  });
  app.put("/reports/:id", async (req, res) => {
    const id = req.params.id;
    const filler = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updatedData = {
      $set: {
        item_status: "Reported",
      },
    };
    const result = await productsCollection.updateOne(
      filler,
      updatedData,
      options
    );
    res.send(result);
  });
  app.delete("/reports/:id", async (req, res) => {
    const id = req.params.id;
    const result = await productsCollection.deleteOne({ _id: ObjectId(id) });
    res.send(result);
  });

  //------------------------------------End Booking-----------------------------------
  app.get("/jwt", async (req, res) => {
    const email = req.query.email;
    const query = { email: email };
    const user = await usersCollection.findOne(query);
    if (user) {
      const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
      });
      return res.send({ accessToken: token });
    }
    res.status(403).send({ accessToken: "" });
  });
  //==================================Start Products===================================

  app.get("/all-phones", async (req, res) => {
    const query = {status:'Available'};
    const result = await productsCollection.find(query).toArray();
    res.send(result);
  });
  app.get("/all-phones/:category", async (req, res) => {
    const category = req.params.category;
    const query = { category: category, status:'Available' };
    const result = await productsCollection.find(query).toArray();
    res.send(result);
  });
  app.post("/all-phones", async (req, res) => {
    const product = req.body;
    const result = await productsCollection.insertOne(product);
    res.send(result);
  });
  app.get("/my-products", async (req, res) => {
    const email = req.query.email;
    const query = { email: email };
    const result = await productsCollection.find(query).toArray();
    res.send(result);
  });
  app.delete("/my-products/:id", async (req, res) => {
    const id = req.params.id;
    const result = await productsCollection.deleteOne({ _id: ObjectId(id) });
    res.send(result);
  });
  app.put("/my-products/:id", async (req, res) => {
    const id = req.params.id;
    const filler = { _id: ObjectId(id) };
    const productInfo = req.body;
    const options = { upsert: true };
    const updatedData = {
      $set: {
        name: productInfo.name,
        sale_price: productInfo.sale_price,
        location: productInfo.location,
        phone: productInfo.phone,
        status: productInfo.status,
      },
    };
    const result = await productsCollection.updateOne(
      filler,
      updatedData,
      options
    );
    res.send(result);
  });
  //------------------------------------End Products-------------------------------------

  //==================================Start Card Payment===================================
  app.post("/create-payment-intent", verifyJWT, async (req, res) => {
    const email = req.query.email;
    const decodedEmail = req.decoded.email;

    if (email !== decodedEmail) {
      return res.status(403).json({
        status: 403,
        message: "Forbidden",
      });
    }
    const booking = req.body;
    const price = booking.sale_price;
    const amount = price * 100;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });

  app.post('/payments',async(req,res) =>{
const payment = req.body
const result = await paymentsCollection.insertOne(payment)
const id = payment.bookingId
const filter ={_id: ObjectId(id)}
const updatedDoc ={
  $set:{
    payment: 'Paid',
    transactionId : payment.transactionId
  }
}
const updateResult = await bookingsCollection.updateOne(filter,updatedDoc)
res.send(result)
})

  //==================================Start Categories===================================
  app.get("/category", async (req, res) => {
    const query = {};
    const result = await categoriesCollection.find(query).toArray();
    res.send(result);
  });
  //------------------------------------End Categories-------------------------------------

  //==================================Start Blogs===================================
  app.get("/blogs", async (req, res) => {
    const query = {};
    const result = await blogsCollection.find(query).toArray();
    res.send(result);
  });
  //------------------------------------End Blogs-------------------------------------

  //==================================Start Ads===================================
  app.get("/my-ads", async (req, res) => {
    const ads = req.query.ads;
    const query = { ads };
    const result = await productsCollection.find(query).toArray();
    res.send(result);
  });
  app.put("/my-ads/:id", async (req, res) => {
    const id = req.params.id;
    const filler = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updatedData = {
      $set: {
        ads: "RunAds",
      },
    };
    const result = await productsCollection.updateOne(
      filler,
      updatedData,
      options
    );
    res.send(result);
  });
  //------------------------------------End Ads-------------------------------------
}
run().catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.send("server is listening");
});

app.listen(PORT, () => {
  console.log(`listening on port${PORT}`);
});
