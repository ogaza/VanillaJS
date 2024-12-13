// A code example from the book "Wzorce Projektowe w JS" by Addy Osmani
// I think this is based on DOM elements, because the logic
// uses DOM events

// the general idea of a mediator is the component that
// holds some logic connecting some independent objects
// not aware of the other participants of the whole process
const mediator = {};

const orgChartMediator = {
  // I think this method represents some data flow process
  // Once invoked it gets hold of a DOM element
  // and attach a event handler to it
  // So the next step comes from the app triggering the event
  // on that DOM element
  addNewEmployee() {
    // employeeDetail mus be a DOM component
    // in order for it to subscribe for a custom events
    const employeeDetail = this.getEmployeeDetail();

    employeeDetail.on("complete", function (employee) {
      const managerSelector = this.selectManager(employee);

      managerSelector.on("save", function (employee) {
        employee.save();
      });
    });
  }
};
