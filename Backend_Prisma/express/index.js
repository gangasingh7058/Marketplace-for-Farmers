const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json()); // Express built-in JSON parser

app.get("/", (req, res) => {
  res.json({
    msg: "WELCOME",
  });
  console.log("WELCOME");
});

app.post("/farmer/signup", async (req, res) => {
  try {
    const body = req.body;

    const response=await prisma.farmer.create({
       data:{
        fname:body.fname,
        lname:body.lname,
        phone:body.phone,
        state:body.state,
        pincode:body.pincode,
        password:body.password
       },
       select:{
        phone:true,
        id:true
       }
    })

    res.json({
        success:true,
        msg:"User Created Successfully",
        res:response
    })
    

  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      msg: "Some error occurred",
    });
  }
});

app.post("/farmer/signin", async (req, res) => {
  try {
    const body = req.body;

    const response = await prisma.farmer.findFirst({
      where: {
        phone: parseInt(body.phone),
        password: body.password,
      },
      select: {
        phone: true,
        id:true
      },
    });

    if (!response) {
      return res.json({
        success: false,
        msg: "Invalid phone or password",
      });
    }

    res.json({
      success: true,
      msg: "Signin successful",
      res: response,
    });
  } catch (error) {
    res.json({
      success: false,
      msg: "Some error occurred",
      error: error.message,
    });
  }
});





app.post("/farmer/crops", async (req, res) => {
  const { phone, crop, quantity, date, price } = req.body; // Destructure required fields

 

  try {
    
    const farmer = await prisma.farmer.findFirst({
      where: {
        phone: parseInt(phone), 
      },
    });

    if (!farmer) {
      return res.status(404).json({
        success: false,
        msg: "Farmer not found",
      });
    }

    
    const response = await prisma.crops.create({
      data: {
        crop,
        quantity: parseInt(quantity),
        date: new Date(date), 
        price: parseInt(price), 
        fid: farmer.id, 
      },
    });

    res.json({
      success: true,
      msg: "Crop added successfully",
      crop: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while adding the crop",
      error: error.message,
    });
  }
});




app.get("/farmer/crops",async (req,res)=>{

  const farmerPhone = req.headers['phone'];

  try {

    const response=await prisma.crops.findMany({
      where:{
        farmer:{
          phone:parseInt(farmerPhone)
        }
      }
    })

    res.json({
      success:true,
      crops:response
    })

    
  } catch (error) {
    res.json({
      success:true,
      msg:"Some Error Occured",
      error:error.message
    })
    
  }

})


app.post("/farmer/deletecrop",async (req,res)=>{
  // console.log(req.body);
  
  const {cid}=req.body
  // console.log(cid);
  
  try {


    const response=await prisma.crops.delete({
      where:{
        id:parseInt(cid)
      }
    })

    if(!response){
      res.json({
        success:false,
        msg:"Unable to find Crop"
      })
    }

    res.json({
      success:true,
      msg:"Deleted SuccessFully",
      res:response
    })
    
  } catch (error) {
    res.json({
      success:false,
      msg:"Some Error Occured",
      error:error.message
    })
  }

})


app.post("/user/signup", async (req, res) => {
  const { fname, lname, password, state, pincode, phone } = req.body;

  try {
    const response = await prisma.User.create({
      data: {
        fname: fname,
        lname: lname,
        password: password,
        state: state,
        pincode: pincode,
        phone: phone
      }
    });

    res.json({
      success: true,
      msg: "User Created Successfully",
      user: response 
    });

  } catch (error) {
    res.json({
      success: false,
      msg: "Some Error Occurred",
      error: error.message
    });
  }
});


app.post("/user/signin",async (req,res)=>{
  const {phone,password}=req.body;


  try {

    const response=await prisma.user.findFirst({
      where:{
        phone:parseInt(phone),
        password:password
      }
    })

    if(!response){
      res.json({
        success:false,
        msg:"Invalid PhoneNo. of Password"
      })
    }
    else{
      res.json({
        success:true,
        response:response
      })
    }
    
  } catch (error) {
    

    res.json({
      success: false,
      msg: "Some Error Occurred",
      error: error.message
    });

  }
})

app.post("/user/getcrops",async (req,res)=>{

  const {crop,quantity}=req.body;

  try {

    const response=await prisma.crops.findMany({
      where:{
        crop:crop,
        quantity:{
          gte:parseInt(quantity)
        }
      },
      select:{
        crop:true,
        quantity:true,
        price:true,
        farmer:{
          select:{
            fname:true,
            state:true,
            id:true
          }
        }
      }
    })

    res.json({
      success:true,
      response:response
    })
    
  } catch (error) {
    res.json({
      success: false,
      msg: "Some Error Occurred",
      error: error.message
    });
  }
})



app.listen(port, () => {
  console.log("Listening on Port => " + port);
});
