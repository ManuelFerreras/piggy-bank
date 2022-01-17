import React from 'react';

export default ({ login, connected, setConnected, accountBalance, contractBalance, accountStoredBalance, openWithdrawMenu, openStoreMenu }) => {

    return (

        <div className='container dashboard'>
            
            <div className='dashboardBg'>
                <h2 className='text-center dashboardHeader'>Dashboard</h2>

                <div className='dashboardInfo'>
                    <div className='info text-center'>
                        <p><span>TVL</span></p>
                        <p>{parseFloat(contractBalance).toFixed(4)} Ether</p>
                    </div>

                    <div className='info text-center'>
                        <p><span>Your Savings</span></p>
                        <p>{parseFloat(accountStoredBalance).toFixed(4)} Ether</p>
                    </div>

                    <div className='info text-center'>
                        <p><span>Ether Balance</span></p>
                        <p>{parseFloat(accountBalance).toFixed(4)} Ether</p>
                    </div>
                </div>

                <div className='dashboardButtons'>
                    {connected ? (
                        <>
                            <button type='button' className='btn btn-store-ether' onClick={() => openStoreMenu()}>Store Ether</button>
                            <button type='button' className='btn btn-withdraw-ether' onClick={() => openWithdrawMenu()}>Withdraw Ether</button>
                        </>
                    ) : (
                        <button type='button' className='btn btn-store-ether' onClick={async () => {await login().then(setConnected(true))}}>Connect Wallet</button>
                    )}
                    
                </div>
            </div>
        </div>

    );

}