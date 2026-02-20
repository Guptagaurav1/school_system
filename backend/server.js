require("dotenv").config();
const app = require(process.env.Root_Path+"/app");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));