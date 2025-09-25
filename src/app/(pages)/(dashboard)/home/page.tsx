import Layout from '@/app/components/Layout'
import ProtectedRoute from '@/app/components/route-guards/ProtectedRoute'
import React from 'react'

const Home = () => {
  return (
    // <ProtectedRoute>
        <Layout>
            <div>Home</div>
        </Layout>
    // </ProtectedRoute>
  )
}

export default Home