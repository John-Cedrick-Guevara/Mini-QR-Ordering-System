ACID principle:
atomicy: all or nothing
consistency: ensures db changes from valis state to another
isolation: one user transaction should be isolated from one another
durability: Once the transaction is successful and you call DB::commit(), the data is permanently baked into MySQL and won't be lost even if the system crashes a second later.