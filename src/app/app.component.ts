import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  columnDefs = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerName: "Select",
      resizable: true,
      pinned: "left",
    },
    {
      headerName: "Group 1",
      pinned: "left",
      children: [
        { headerName: "Child 1", field: "child1", resizable: true },
        { headerName: "Child 2", field: "child2", resizable: true },
        { headerName: "Child 3", field: "child3", resizable: true },
        { headerName: "Child 4", field: "child4", resizable: true },
      ],
    },
    {
      headerName: "Group 2",
      pinned: "left",
      children: [
        { headerName: "Child 5", field: "child5", resizable: true },
        { headerName: "Child 6", field: "child6", resizable: true },
        { headerName: "Child 7", field: "child7", resizable: true },
        { headerName: "Child 8", field: "child8", resizable: true },
      ],
    },
  ];

  rowData = [
    {
      child1: "Data 1",
      child2: "Data 2",
      child3: "Data 3",
      child4: "Data 4",
      child5: "Data 5",
      child6: "Data 6",
      child7: "Data 7",
      child8: "Data 8",
    },
    {
      child1: "Data A",
      child2: "Data B",
      child3: "Data C",
      child4: "Data D",
      child5: "Data E",
      child6: "Data F",
      child7: "Data G",
      child8: "Data H",
    },
    // Add more rows as needed
  ];

  onSelectionChanged(event: any) {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    console.log("Selected row data:", selectedData);
  }
}
