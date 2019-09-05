import React, { useEffect, useState } from "react";
import TransactionToastMessages from "./content/TransactionToastMessages";
import { ToastMessage, Button } from "rimble-ui";
import ProgressAlertProvider from "./components/ProgressAlertProvider";
import { differenceWith, isEqual } from "lodash-es";

const ProgressAlertUtil = ({ transactionStack, transactions }, props) => {
  const [decoratedTransactions, setDecoratedTransactions] = useState(
    transactions
  );

  useEffect(() => {
    console.log("transactionStack", transactionStack);
    console.log("transactions", transactions);
    console.log("decoratedTransactions", decoratedTransactions);

    // Check if transactions has updated
    if (
      transactions &&
      transactionStack &&
      differenceWith(transactions, decoratedTransactions, isEqual).length > 0
    ) {
      console.log("Updating decoratedTransactions");
      setDecoratedTransactions(transactions);
    }
  }, [transactionStack]);

  const triggerErrorProgressAlert = () => {
    window.progressAlertProvider.addMessage("Processing", {
      message: "Attempting to " + "test",
      transaction: "123x321",
      timeEstimate: 60,
      error: { error: "error" }
    });
  };

  const triggerTxProgressAlert = () => {
    window.progressAlertProvider.addMessage("Processing", {
      message: "Attempting to " + "testMethod",
      transaction: "123x321",
      timeEstimate: 200,
      error: {}
    });
  };

  return (
    <div>
      <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
      <Button size={"small"} onClick={triggerErrorProgressAlert}>
        Trigger Error ProgressAlert
      </Button>

      <Button size={"small"} onClick={triggerTxProgressAlert}>
        Trigger tx ProgressAlert
      </Button>
      <ProgressAlertProvider
        ref={node => (window.progressAlertProvider = node)}
      />
    </div>
  );
};

// class ProgressAlertUtil extends React.Component {
//   // Determines if collections are same size
//   collectionHasNewObject = (prevCollection, currentCollection) => {
//     return (
//       typeof prevCollection === "undefined" ||
//       Object.keys(prevCollection).length !==
//         Object.keys(currentCollection).length
//     );
//   };

//   // Returns object from currentCollection that doesn't exist in prevCollection
//   getNewObjectFromCollection = (prevCollection, currentCollection) => {
//     if (typeof prevCollection !== "undefined") {
//       const objectKey = Object.keys(currentCollection).filter(key => {
//         return !Object.keys(prevCollection).includes(key);
//       });
//       return currentCollection[objectKey];
//     } else {
//       return Object.keys(currentCollection).map(key => {
//         return currentCollection[key];
//       });
//     }
//   };

//   // Compare two collections of objects, return single object from current collection that differs from prev collection
//   getUpdatedObjectFromCollection = (prevCollection, currentCollection) => {
//     const updatedTransaction = Object.keys(prevCollection)
//       .map(key => {
//         if (
//           prevCollection[key].lastUpdated !== currentCollection[key].lastUpdated
//         ) {
//           return currentCollection[key];
//         } else {
//           return null;
//         }
//       })
//       .filter(object => object !== null);
//     return updatedTransaction[0];
//   };

//   // Returns an transaction from a collection based on a given identifier
//   getTransactionFromCollection = (identifier, collection) => {
//     const object = collection[`tx${identifier}`];
//     return object;
//   };

//   // Returns either a new object or finds an updated object in a collection against a previous collection
//   getUpdatedTransaction = (prevCollection, currentCollection) => {
//     let tx = null;
//     let currentTx = {};
//     let prevTx = {};

//     if (this.collectionHasNewObject(prevCollection, currentCollection)) {
//       tx = this.getNewObjectFromCollection(prevCollection, currentCollection);
//     } else {
//       currentTx = this.getUpdatedObjectFromCollection(
//         prevCollection,
//         currentCollection
//       );
//       if (currentTx) {
//         prevTx = this.getTransactionFromCollection(
//           currentTx.created,
//           prevCollection
//         );
//       } else {
//         return false;
//       }

//       if (currentTx.status !== prevTx.status) {
//         tx = currentTx;
//       }
//     }
//     return tx;
//   };

//   // Check for updates to the transactions collection
//   processTransactionUpdates = prevProps => {
//     let tx = null;
//     if (Object.keys(this.props.transactions).length) {
//       tx = this.getUpdatedTransaction(
//         prevProps.transactions,
//         this.props.transactions
//       );
//     }

//     if (tx !== null && tx !== false && typeof tx !== "undefined") {
//       this.showTransactionToast(tx);
//     }
//   };

//   showTransactionToast = transaction => {
//     console.log("showTransactionToast: ", { ...transaction });
//     // Get text info for toast
//     let toastMeta = this.getTransactionToastMeta(transaction);

//     console.log("showTransactionToast", transaction);

//     if (
//       transaction.status === "pending" ||
//       transaction.status === "success" ||
//       transaction.status === "error"
//     ) {
//       window.progressAlertProvider.addMessage("Processing", {
//         message: "Attempting to " + transaction.method,
//         transaction: transaction.hash,
//         timeEstimate: transaction.timeEstimate,
//         error: transaction.error
//       });
//     } else {
//       // Show non-pending toast
//       window.toastProvider.addMessage(".", toastMeta);
//     }
//   };

//   getTransactionToastMeta = transaction => {
//     let transactionToastMeta = {};
//     let status = transaction.status;

//     switch (status) {
//       case "initialized":
//         transactionToastMeta = TransactionToastMessages.initialized;
//         break;
//       case "started":
//         transactionToastMeta = TransactionToastMessages.started;
//         break;
//       case "pending":
//         transactionToastMeta = TransactionToastMessages.pending;
//         break;
//       case "confirmed":
//         transactionToastMeta = TransactionToastMessages.confirmed;
//         break;
//       case "success":
//         transactionToastMeta = TransactionToastMessages.success;
//         break;
//       case "error":
//         transactionToastMeta = TransactionToastMessages.error;
//         break;
//       default:
//         break;
//     }

//     return transactionToastMeta;
//   };

//   componentDidUpdate(prevProps, prevState) {
//     this.processTransactionUpdates(prevProps);
//   }

//   render() {
//     return (
//       <div>
//         <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
//         <ProgressAlertProvider
//           ref={node => (window.progressAlertProvider = node)}
//         />
//       </div>
//     );
//   }
// }

export default ProgressAlertUtil;
