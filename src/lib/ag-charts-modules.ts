import { ModuleRegistry } from "ag-charts-community";
import { DonutSeriesModule } from "ag-charts-community";
import { BarSeriesModule } from "ag-charts-community";

// Register all AG Charts modules once at application startup
ModuleRegistry.registerModules([DonutSeriesModule, BarSeriesModule]);
