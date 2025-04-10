import React from 'react'
import CategoryHeader from './components/category-header'
import CategoryTable from './components/category-table'

const CategotyPage = () => {
    return (
        <main className="p-6">
            <CategoryHeader />
            <CategoryTable />
        </main>
    )
}

export default CategotyPage