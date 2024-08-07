"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Popover from './popover';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const config = {
    headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`
    }
};

const getNextjsLatestRelease = async () => {
    const response = await axios.get("https://api.github.com/repos/vercel/next.js/releases/latest", config);

    return response.data.tag_name;
}

const getRepositoryPackageJson = async (owner, repo) => {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/package.json`, config);
    const content = Buffer.from(response.data.content, 'base64').toString('utf8');
    return JSON.parse(content);
};

const checkAppJsxExistence = async (owner, repo) => {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents`, config);
    const files = response.data.map(file => ({
        name: file.name
    }));

    return {
        isRouterPages: files.some(file => file.name === 'pages'),
        isRouterApp: files.some(file => file.name === 'app')
    };
};

const VercelInfo = ({info}) => {
    const [nextjsVersion, setNextjsVersion] = useState(null);
    const [nextjsRelease, setNextjsRelease] = useState(null);
    const [isRouterPages, setIsRouterPages] = useState(false);
    const [isRouterApp, setIsRouterApp] = useState(false);
    const [isUsingTurbopack, setIsUsingTurbopack] = useState(false);
    const [nextjsUpgradeAvailable, setNextjsUpgradeAvailable] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const release = await getNextjsLatestRelease();
                const packageJson = await getRepositoryPackageJson(info.owner.login, info.name);
                const appJsxCheck = await checkAppJsxExistence(info.owner.login, info.name);

                const version = packageJson?.dependencies?.next?.replace('^', '').replace('~', '');
                setNextjsVersion(version);
                setNextjsRelease(release);
                setIsRouterPages(appJsxCheck.isRouterPages);
                setIsRouterApp(appJsxCheck.isRouterApp);
                setIsUsingTurbopack(packageJson?.scripts?.dev?.includes('--turbo') || false);

                if (info.framework === "nextjs" && version && release && version < release) {
                    setNextjsUpgradeAvailable(true)
                } else {
                    setNextjsUpgradeAvailable(false)
                }
            } catch (error) {
                console.error(`Error fetching data for [VERCEL INFO] : ${error}`);
            }
        };

        fetchData();
    }, [info])

    const upgradeIcon = nextjsUpgradeAvailable ? (
        <Popover
            button={<span style={{ fontSize: 'medium' }}>⏫</span>}
            content={<span><p><strong>Upgrade available</strong></p>Next.js: {nextjsVersion} ➡️ {nextjsRelease}</span>}
        /> 
    ) : null;

    let labelNext = 'Next.js project';
    if (isRouterPages && isRouterApp) {
        labelNext += ' using both Pages and App';
    } else if (isRouterPages) {
        labelNext += ' using Pages';
    } else if (isRouterApp) {
        labelNext += ' using App Router';
    } else {
        labelNext += ' using neither Pages nor App Router';
    }

    const turboIcon = isUsingTurbopack ? (
        <Popover
            button={<Image alt='Turbo Icon' height={16} width={16} src='https://turbo.build/images/docs/pack/turbo-benchmark-icon-dark.svg' />}
            content={<span>Using Turbopack</span>}
        />
    ) : null;
    
    const vercelIcon = (
        <Popover
            button={
                <svg aria-label="Vercel logomark" height="16" role="img" style={{ width: 'auto', overflow: 'visible' }} viewBox="0 0 74 64">
                    <path d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z" fill="white"></path>
                </svg>
            }
            content={`Vercel on node: ${info.nodeVersion}`}
        />
    );

    const frameworkIcon = info.framework === 'nextjs' ? (
        <Popover
            button={
                <svg aria-label="Next.js logomark" data-theme="dark" height="16" role="img" viewBox="0 0 180 180" width="16">
                    <mask height="180" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }} width="180" x="0" y="0">
                        <circle cx="90" cy="90" fill="black" r="90"></circle>
                    </mask>
                    <g mask="url(#:R0:mask0_408_134)">
                        <circle cx="90" cy="90" data-circle="true" fill="black" r="90" stroke="white" strokeWidth="6px"></circle>
                        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#:R0:paint0_linear_408_134)"></path>
                        <rect fill="url(#:R0:paint1_linear_408_134)" height="72" width="12" x="115" y="54"></rect>
                    </g>
                    <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id=":R0:paint0_linear_408_134" x1="109" x2="144.5" y1="116.5" y2="160.5">
                            <stop stopColor="white"></stop>
                            <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                        </linearGradient>
                        <linearGradient gradientUnits="userSpaceOnUse" id=":R0:paint1_linear_408_134" x1="121" x2="120.799" y1="54" y2="106.875">
                            <stop stopColor="white"></stop>
                            <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                        </linearGradient>
                    </defs>
                </svg>
            }
            content={labelNext}
        />
    ) : null;

    return (
        <span className="text-zinc-500 text-xs flex items-center gap-1">
            {upgradeIcon && <span>{upgradeIcon}</span>}
            {frameworkIcon && <span>{frameworkIcon}</span>}
            {vercelIcon && <span>{vercelIcon}</span>}
            {turboIcon && <span>{turboIcon}</span>}
        </span>
    );
}