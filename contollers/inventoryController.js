const inventory = require("../models/inventory");
const Inventory = require("../models/inventory");
exports.bookSold = async (req, res) => {
    try {
      const { bookId, bookSold } = req.body;

      const inventory = await Inventory.findOne({bookId});
      
      console.log(inventory.bookLeft,bookSold)
      if(inventory.bookLeft>=bookSold){
          const newIN = await Inventory.findByIdAndUpdate(inventory._id,{
        bookLeft:inventory.bookLeft-bookSold,
        bookSold:inventory.bookSold+bookSold,
          });

          res.status(200).json({
            succuss: true,
            message: "Inventary added sucessfuly",
           Inventory:newIN,
          });
       

}else{
          res.status(400).json({ succuss: false, message: "Not available " });
      }
   
  
     
    } catch (error) {
      res.status(400).json({ succuss: false, message: error });
    }
  };
  
exports.addInventory = async (req, res) => {
  
      const { bookId, totalBook } = req.body;
      // const { orderId } = req.params;
      try {
        if (bookId) {
          
         const newInventory=   await Inventory.create({  
            bookLeft:totalBook,   
             totalBook,
              bookId,
              user: req.user._id,
            });
            res.status(200).json({
              succuss: true,
              message: "Inventary added sucessfuly",
             Inventory:newInventory,
            });
         
        } else {
          res.status(400).json({ succuss: false, message: "Invalid Credential" });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ succuss: false, message: error });
      }
  
    }
exports.getSinglebookInventory = async (req, res) => {
  
    //   const { bookId} = req.body;
      const { bookId } = req.params;
      try {
        if (bookId) {
          
         const BookInventory=   await Inventory.findOne({bookId});
            res.status(200).json({
              succuss: true,
              message: "Inventary get sucessfuly",
             Inventory:BookInventory,
            });
         
        } else {
          res.status(400).json({ succuss: false, message: "Invalid Credential" });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ succuss: false, message: error });
      }
  
    }