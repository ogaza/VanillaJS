// I think an madiator can be used for example
// for filling some data through a coule of UI staps
// each step can be kept in the mediator object
// after each step is completed
// mediator can perform some specific action - like
// sending all the information to the server

const participantOne = {
  processOne(dataObj) {
    const { fieldOne } = dataObj;

    return { ...dataObj, fieldOne: fieldOne + 1 };
  }
};

const participantTwo = {
  processTwo(dataObj) {
    return { ...dataObj, fieldTwo: 1 };
  }
};

const dataProcessorsMediator = {
  addParticipants(partOne, partTwo) {
    this.partOne = partOne;
    this.partTwo = partTwo;
  },
  conductTheDtaProcessing() {
    var data = { fieldOne: 1 };

    while (data.fieldOne < 10) {
      data = this.partOne.processOne(data);
    }
    data = this.partTwo.processTwo(data);

    console.log(data);
  }
};

dataProcessorsMediator.addParticipants(participantOne, participantTwo);
dataProcessorsMediator.conductTheDtaProcessing();
