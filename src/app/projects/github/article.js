import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { EyeClosedIcon, EyeIcon, MarkGithubIcon, StarIcon, DependabotIcon } from '@primer/octicons-react';
import VercelInfo from '@/components/vercel-info';
import { getTrafficPageViews, getDependabotAlerts } from '../../data';
import PropTypes from 'prop-types';

const Article =  ({peoject}) => {
    const [views, setViews] = useState(
        <span title="Can't get traffic data for someone else's repo.">
            <EyeClosedIcon className="w-4 h-4" />
        </span>
    );

    const [alerts, setAlerts] = useState(
        <span title="Can't get alerts data for someone else's repo.">
            <DependabotIcon className="w-4 h-4" />
        </span>
    );

    const appLink = project.homepage || project.html_url;
    const isGitHubUser = process.env.GITHUB_USERNAME === project.owner.login;

    useEffect(() => {
        const fetchData = async () => {
            if (isGitHubUser) {
                try {
                    const [trafficData, alertData] = await Promise.all([
                        getTrafficPageViews(project.owner.login, project.name),
                        getDependabotAlerts(project.owner.login, project.name)
                    ]);

                    const { todayUniques, sumUniques } = trafficData;
                    const openAlertsBySeverity = alertData || {
                        critical: 0,
                        high: 0,
                        medium: 0,
                        low: 0,
                    };

                    setViews(
                        <span title="Unique repository visitors: Last 14 days / Today.">
                            <EyeIcon className="w-4 h-4" />{' '}
                            {Intl.NumberFormat('en-US', { notation: 'compact' }).format(sumUniques)}/{Intl.NumberFormat('en-US', { notation: 'compact' }).format(todayUniques)}
                        </span>
                    );

                    const alertColor =
                        openAlertsBySeverity.critical > 0
                            ? 'red'
                            : openAlertsBySeverity.high > 0
                            ? 'orange'
                            : openAlertsBySeverity.medium > 0
                            ? 'yellow'
                            : openAlertsBySeverity.low > 0
                            ? 'blue'
                            : 'gray';
                    const alertCountTotal =
                        openAlertsBySeverity.critical +
                        openAlertsBySeverity.high +
                        openAlertsBySeverity.medium +
                        openAlertsBySeverity.low;
                    const alertTitle =
                        alertCountTotal > 0
                            ? `Open Dependabot alerts: ${JSON.stringify(openAlertsBySeverity)}`
                            : 'No open Dependabot alerts.';

                    setAlerts(
                        <span title={alertTitle}>
                            <DependabotIcon className="w-4 h-4 danger" fill={alertColor} />{' '}
                            {Intl.NumberFormat('en-US', { notation: 'compact' }).format(alertCountTotal)}
                        </span>
                    );
                } catch (error) {
                    console.error('Error fetching GitHub data:', error);
                }
            }
        };

        fetchData();
    }, [isGitHubUser, project.owner.login, project.name]);

    return (
        <article className="p-4 md:p-8">
            <div className="flex justify-between gap-2 items-center">
                <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
                    <time dateTime={new Date(project.created_at).toISOString()} title="Created">
                        {new Date(project.created_at).toISOString().substring(0, 10)}
                    </time>
                </span>
                <span className="text-zinc-500 text-xs flex items-center gap-1">
                    {project.vercel && <VercelInfo info={{ ...project.vercel, owner: project.owner }} />}
                    <span title="Total stars.">
                        <StarIcon className="w-4 h-4" />{' '}
                        {Intl.NumberFormat('en-US', { notation: 'compact' }).format(project.stargazers_count)}
                    </span>
                </span>
            </div>
            <Link href={appLink} legacyBehavior>
                <h2
                    className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display cursor-pointer"
                    title={`Click to view the ${project.homepage ? 'app' : 'repo'}.`}
                >
                    <span className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-transparent bg-clip-text">
                        {project.name}
                    </span>
                </h2>
            </Link>
            <p className="z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">{project.description}</p>
            <div className="flex justify-between gap-2 items-center float-left mt-2 border-t-2 border-gray-700 border-opacity-50">
                <span className="text-zinc-500 text-xs">{views} {alerts}</span>
            </div>
            <div className="flex justify-between gap-2 items-center float-right mt-2 border-t-2 border-gray-700 border-opacity-50">
                <span className="text-zinc-500 text-xs align-middle flex items-center gap-1" title="GitHub repository link.">
                    <MarkGithubIcon className="w-4 h-4" />
                    <Link href={project.html_url} className="hover:text-blue-800">
                        {project.name}
                    </Link>
                </span>
            </div>
        </article>
    );
} 

Article.propTypes = {
    project: PropTypes.shape({
        name: PropTypes.string.isRequired,
        owner: PropTypes.shape({
            login: PropTypes.string.isRequired,
        }).isRequired,
        homepage: PropTypes.string,
        html_url: PropTypes.string.isRequired,
        description: PropTypes.string,
        stargazers_count: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        vercel: PropTypes.object,
    }).isRequired,
};

export default Article;