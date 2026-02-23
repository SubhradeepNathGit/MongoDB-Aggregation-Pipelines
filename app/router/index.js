const express = require("express");
const router = express.Router();

//Seed
const { seedDatabase } = require("../helper/seed");

//Controllers
const ProductPriceRange = require("../controller/ProductPriceRange");
const UserAgeRange = require("../controller/UserAgeRange");
const OrderSortByDate = require("../controller/OrderSortByDate");
const UserTotalCount = require("../controller/UserTotalCount");
const DeliveredSalesRevenue = require("../controller/DeliveredSalesRevenue");
const CategoryAveragePrice = require("../controller/CategoryAveragePrice");
const DiscountedPricing = require("../controller/DiscountedPricing");
const ExpensiveProductFlag = require("../controller/ExpensiveProductFlag");
const OrderYearExtraction = require("../controller/OrderYearExtraction");
const GSTCalculation = require("../controller/GSTCalculation");
const InventoryStockLevel = require("../controller/InventoryStockLevel");
const HighPriceItemsFilter = require("../controller/HighPriceItemsFilter");
const ActiveUserFilter = require("../controller/ActiveUserFilter");
const DeliveredOrderFilter = require("../controller/DeliveredOrderFilter");
const BulkOrderQuantityFilter = require("../controller/BulkOrderQuantityFilter");
const TopTierSpenders = require("../controller/TopTierSpenders");
const RevenueByCategoryReport = require("../controller/RevenueByCategoryReport");
const InactiveCustomers = require("../controller/InactiveCustomers");
const MostPopularProduct = require("../controller/MostPopularProduct");
const MonthlyRevenueAnalytics = require("../controller/MonthlyRevenueAnalytics");
const PopularActiveCities = require("../controller/PopularActiveCities");
const ItemQuantityDeepFilter = require("../controller/ItemQuantityDeepFilter");
const ElectronicsCategoryDeepFilter = require("../controller/ElectronicsCategoryDeepFilter");
const HighValueItemFlag = require("../controller/HighValueItemFlag");

//Seed Route
router.get("/seed", seedDatabase);

//Task Routes
router.get("/task1", ProductPriceRange.execute);
router.get("/task2", UserAgeRange.execute);
router.get("/task3", OrderSortByDate.execute);
router.get("/task4", UserTotalCount.execute);
router.get("/task5", DeliveredSalesRevenue.execute);
router.get("/task6", CategoryAveragePrice.execute);
router.get("/task7", DiscountedPricing.execute);
router.get("/task8", ExpensiveProductFlag.execute);
router.get("/task9", OrderYearExtraction.execute);
router.get("/task10", GSTCalculation.execute);
router.get("/task11", InventoryStockLevel.execute);
router.get("/task12", HighPriceItemsFilter.execute);
router.get("/task13", ActiveUserFilter.execute);
router.get("/task14", DeliveredOrderFilter.execute);
router.get("/task15", BulkOrderQuantityFilter.execute);
router.get("/task16", TopTierSpenders.execute);
router.get("/task17", RevenueByCategoryReport.execute);
router.get("/task18", InactiveCustomers.execute);
router.get("/task19", MostPopularProduct.execute);
router.get("/task20", MonthlyRevenueAnalytics.execute);
router.get("/task21", PopularActiveCities.execute);
router.get("/task22", ItemQuantityDeepFilter.execute);
router.get("/task23", ElectronicsCategoryDeepFilter.execute);
router.get("/task24", HighValueItemFlag.execute);

module.exports = router;
