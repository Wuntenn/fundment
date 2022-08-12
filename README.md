# Fundment Code Test
 
The aim of this task is to demonstrate the ability to create forms that produce complex data structures, 
where properties of those objects are dependent on values of other properties. 
Functionality should be prioritised whilst styling can be kept minimal. 
Additional packages may be added if necessary.

### Task
Create a reactive form component to add transactions of type `TransactionCreate`, 
please use the schemas and stubs within the `core` directory for reference.
Depending on the transaction type the following conditions should be met
####  Deposits
 - Source bank account field hidden
 - Required target bank account
####  Withdrawals
 - Target bank account field hidden
 - Required source bank account
 - Amount should not exceed current value of source bank account
 - Additional boolean field 'Would you like to withdraw the full value of this account?' 
   - This field should default to false 
   - When false display the amount field
   - When true the amount field should be hidden and the `transaction.amount` set to the `current_value` of the bank account
####  Transfers
 - Target and source bank account fields required
 - Target and source bank account must have the same `client_id`
 - Amount should not exceed current value of source bank account
#### All transactions
 - Optional description field  

- Scalability of your form component should be considered - a reusable form component is ideal but not a requirement
- Using RxJs populate source and target bank account details for each transaction
- Optional usage of state management libraries, or mocking of state management principles
- Adding unit tests is highly recommended

Optional:

- Include a custom validator i.e. sort code must be a string of 6 numbers 
- Display the data created by the form in a table using the relevant pipes to format values
- Include a custom pipe i.e. format sort codes '111111' -> '11-11-11'
- Style appropriately
