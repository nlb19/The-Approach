import React from 'react'
import Header from '../Header'
import { Helmet, HelmetData } from 'react-helmet-async'

type MainPageLayoutProps = {
    children: React.ReactNode;
    title: string;
};
const helmetData = new HelmetData({});

export const MainPage = ({children, title}: MainPageLayoutProps) => {
  return (
    <>
        <Helmet helmetData={helmetData} title={title ? `${title} | The Approach` : undefined} defaultTitle="The Approach"/>
        <Header />
        <div className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-6rem)] bg-white dark:bg-charcoal w-screen mt-16 md:mt-24 transition-colors duration-500 p-2 md:p-8">
            { children }
        </div>
    </>
  )
}
