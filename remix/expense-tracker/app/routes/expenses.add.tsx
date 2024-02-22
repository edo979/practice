import Modal from '~/components/Modal'

export default function ExpenseAdd() {
  return (
    <Modal>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Expense title:
          </label>
          <input type="text" name="title" id="title" className="form-control" />
        </div>

        <div className="d-flex align-items-center gap-4">
          <label htmlFor="amount" className="form-label mb-0">
            Amount:
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </Modal>
  )
}
