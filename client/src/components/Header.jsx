import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { FiSearch, FiX } from 'react-icons/fi'

const Header = () => {

    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()
    const [selectedImage, setSelectedImage] = useState(null)

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setShowLogin(true)
        }
    }

    return (
        <>
            <motion.div
                className='flex flex-col lg:flex-row justify-between items-center my-20 mt-8 px-4 sm:px-10 max-w-7xl mx-auto'
                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                {/* Left text section */}
                <div className='flex-1 w-full lg:w-1/2'>
                    <motion.div
                        className='text-stone-500 inline-flex items-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <p>Best text to image generator</p>
                        <img src={assets.star_icon} alt="" />
                    </motion.div>

                    <motion.h1
                        className='mt-10 text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] text-left'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 2 }}
                    >
                        Turn text to <span style={{ color: '#571275' }}>image</span>, in seconds.
                    </motion.h1>

                    <motion.p
                        className='max-w-xl mt-5'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Imagine it, describe it, and bring it to life. Transform your ideas into stunning visuals in seconds with cutting-edge AI. Make every design unforgettable with <span className="font-bold text-xl" style={{ color: '#571275' }}>Pictovia</span>.
                    </motion.p>

                    {/* Input and button row */}
                    <motion.div
                        className='flex items-center gap-3 mt-8'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        {/* Input box */}
                        <motion.div
                            className='flex items-center px-4 py-2 border border-gray-300 rounded-full w-full max-w-md bg-white shadow-sm'
                            whileHover={{ scale: 1.02 }}
                        >
                            <FiSearch className='text-[#571275] mr-2' />
                            <input
                                type='text'
                                placeholder='Misty valley at dawn'
                                className='flex-1 outline-none text-gray-700'
                            />
                            <button>
                                <FiX className='text-gray-400 hover:text-gray-600' />
                            </button>
                        </motion.div>

                        {/* Generate button */}
                        <motion.button
                            className='text-white bg-[#571275] hover:bg-[#47105f] font-semibold px-6 py-2.5 rounded-lg whitespace-nowrap transition-colors duration-300'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ default: { duration: 0.5 }, opacity: { delay: 1, duration: 1 } }}
                            onClick={onClickHandler}
                        >
                            Generate AI Images
                        </motion.button>
                    </motion.div>
                </div>

                {/* Right images section */}
                <motion.div
                    className='flex-1 w-full lg:w-1/2 flex flex-col items-center mt-16 lg:mt-0 lg:ml-12'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    {/* Big featured image */}
                    <motion.img
                        className='rounded-2xl w-3/4 object-cover'
                        src={assets.ai1}
                        alt='Generated preview'
                        whileHover={{ scale: 1.02 }}
                    />

                    {/* Small style thumbnails row */}
                    <div className='flex mt-4 gap-2 bg-white p-2 rounded-xl shadow'>
                        {[assets.ai7, assets.ai5, assets.ai3, assets.ai4].map((image, index) => (
                            <img
                                key={index}
                                className='w-16 h-16 rounded-lg object-cover cursor-pointer hover:scale-105 transition-all'
                                src={image}
                                alt={`Style thumbnail ${index + 1}`}
                                onClick={() => setSelectedImage(image)}
                            />
                        ))}

                        <div className='flex items-center justify-center w-16 h-16 rounded-lg bg-neutral-100 text-sm font-medium'>
                            20+
                        </div>
                    </div>

                    {/* Small heading */}
                    <h3 className='text-lg font-semibold mb-4 text-neutral-700'>
                        Generated images from Pictovia
                    </h3>
                </motion.div>
            </motion.div>

            {/* Modal for full image preview */}
            {selectedImage && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        alt='Full preview'
                        className='max-w-full max-h-full rounded-lg shadow-lg'
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    )
}

export default Header
