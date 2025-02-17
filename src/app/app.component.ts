import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  columnDefs = [
    {
      checkboxSelection: true,
      headerName: "Select",
      resizable: true,
      pinned: "left",
    },
    {
      headerName: "Group 1",
      children: [
        { headerName: "Child 1", field: "child1", resizable: true },
        { headerName: "Child 2", field: "child2", resizable: true },
        { headerName: "Child 3", field: "child3", resizable: true },
        { headerName: "Child 4", field: "child4", resizable: true },
      ],
    },
    {
      headerName: "Group 2",
      children: [
        { headerName: "Child 5", field: "child5", resizable: true },
        { headerName: "Child 6", field: "child6", resizable: true },
        { headerName: "Child 7", field: "child7", resizable: true },
        { headerName: "Child 8", field: "child8", resizable: true },
      ],
    },
  ];

  rowData = [
    // {
    //   child1: "Data 1",
    //   child2: "Data 2",
    //   child3: "Data 3",
    //   child4: "Data 4",
    //   child5: "Data 5",
    //   child6: "Data 6",
    //   child7: "Data 7",
    //   child8: "Data 8",
    // },
    // {
    //   child1: "Data A",
    //   child2: "Data B",
    //   child3: "Data C",
    //   child4: "Data D",
    //   child5: "Data E",
    //   child6: "Data F",
    //   child7: "Data G",
    //   child8: "Data H",
    // },
    // Add more rows as needed
  ];

  defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
  };

  // serverSideStoreType = "partial";
  gridApi;
  rowClassRules = {
    "selected-row": (params: any) => params.node.isSelected(),
  };

  ngOnInit(): void {
    for (let index = 0; index < 1000; index++) {
      this.rowData.push({
        child1: "Data 1",
        child2: "Data 2",
        child3: "Data 3",
        child4: "Data 4",
        child5: "Data 5",
        child6: "Data 6",
        child7: "Data 7",
        child8: "Data 8",
      });
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  onSelectionChanged(event: any) {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    console.log("Selected row data:", selectedData);

    const group1Data = selectedData.filter((data) => data.group === "Group 1");
    const group2Data = selectedData.filter((data) => data.group === "Group 2");
    console.log("Selected data for Group 1:", group1Data);
    console.log("Selected data for Group 2:", group2Data);
  }

  // uncheckHeaderCheckbox() {
  //   this.checkboxService.setCheckboxState(false);
  // }

  removeItem() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const selectedRowNode = selectedNodes[0];
      console.log("Selected Row Node:", selectedRowNode);

      // Remove the item from the server-side data source
      this.gridApi.refreshInfiniteCache({ purge: true });
    }
  }
}
