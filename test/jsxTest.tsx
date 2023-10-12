import { JSX, Builder, StyleSheet, loadImage } from '../src/index';
import { writeFileSync } from 'fs';
import { manropeBold } from './common';
import path = require('path');

const colors = {
    LightGray: '#A0A1A3',
    Gray: '#474B4E',
    DarkGray: '#272A2D',
    White: '#FFFFFF',
    Green: '#22A559',
    Yellow: '#F0B332',
    Red: '#F24043',
    Blue: '#8ACDFF'
} as const;

function RankCard({
    avatar,
    level,
    xp,
    requiredXP,
    rank,
    displayName,
    username,
    status,
    hidePercentage,
    svgIcon,
    styleRound,
    title
}: {
    avatar: string;
    level: number;
    xp: number;
    requiredXP: number;
    rank: number;
    displayName?: string;
    username?: string;
    status: 'online' | 'idle' | 'dnd' | 'invisible';
    hidePercentage?: boolean;
    svgIcon: JSX.Element;
    styleRound: string;
    title: string;
}) {
    if (!displayName && !username) {
        throw new Error('A displayName or username is required when instantiating RankCard.');
    }

    const fixed = (v: number) => {
        const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' });
        return formatter.format(v);
    };

    const percentage = Math.floor((xp / requiredXP) * 100);

    if (displayName && displayName.length > 30) {
        displayName = displayName.substring(0, 30) + '...';
    }

    if (username && username.length > 30) {
        username = username.substring(0, 30) + '...';
    }

    const statusColor =
        status === 'online'
            ? colors.Green
            : status === 'idle'
                ? colors.Yellow
                : status === 'dnd'
                    ? colors.Red
                    : colors.Gray;

    return (
        <div tw="flex bg-[#2F3136]/80 h-[80%] w-[95%] items-center justify-around rounded-3xl">
            <div tw="flex relative">
                <img src={avatar} alt="avatar" tw={`h-[311px] w-[311px] rounded-full mr-8 border-[#272A2D]/80 border-8`} />
                <div
                    tw={`bg-[${statusColor}] h-20 w-20 rounded-full flex absolute bottom-3 right-7 border-[#272A2D]/80 border-8`}
                ></div>
            </div>

            <div tw="flex flex-col">
                <div tw="flex items-center justify-between">
                    <div tw="flex flex-col">
                        <div tw="flex flex-wrap items-center justify-center">
                            <h1 tw={`text-white text-6xl mr-5`}>{displayName}</h1>
                            {title && <span tw={styleRound}>
                                {svgIcon}
                                <span tw="ml-2">{title}</span>
                            </span> }
                        </div>
                        {username && <div tw="flex text-[#A7A7A7] text-4xl mb-4">@{username}</div> }
                    </div>
                    <h1 tw="text-[#A7A7A7] text-6xl">{percentage}%</h1>
                </div>
                <div tw="flex bg-[#292929]/70 h-[50px] w-[1413px] rounded-full">
                    <div tw={`flex bg-[#5865F2] h-[50px] w-[${percentage}%] rounded-full`}></div>
                </div>

                <div tw="flex justify-between w-[55%] font-bold">
                    <h1 tw="text-[45px] mr-16">
                        <span tw="text-[#A7A7A7] mr-2">LEVEL:</span>
                        <span tw="text-white">{level}</span>
                    </h1>

                    <h1 tw="text-[45px] mr-16">
                        <span tw="text-[#A7A7A7] mr-2">XP:</span>
                        <span tw="text-white">
                            {fixed(xp)}/{fixed(requiredXP)}
                        </span>
                    </h1>

                    <h1 tw="text-[45px]">
                        <span tw="text-[#A7A7A7] mr-2">RANK:</span>
                        <span tw="text-white">#{rank}</span>
                    </h1>
                </div>
            </div>
        </div>
    );
}

async function main() {
    const bg = await loadImage(path.join(__dirname, 'background.jpg'));

    const styles = StyleSheet.create({
        root: {
            fontFamily: manropeBold.name,
            display: 'flex',
            backgroundImage: `url("${bg.toDataURL()}")`,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '1.5rem'
        }
    });

    const builder = new Builder(2000, 512);

    builder.style = styles.root;

    builder
        .addComponent(
            <RankCard
                {...{
                    avatar:
                        'https://pps.whatsapp.net/v/t61.24694-24/347251676_623986856287511_4489793307126508814_n.jpg?ccb=11-4&oh=01_AdSfm1Dbfj-wWPln1LKTexP6CEEXzRgQD6JOArljmAbAeg&oe=65327B64&_nc_sid=000000&_nc_cat=103',
                    level: 54,
                    xp: 2548,
                    requiredXP: 3796,
                    rank: 32,
                    displayName: 'Dwi Rizqi',
                    username: 'dwirizqi.h',
                    status: 'online',
                    svgIcon: (
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 100 100">
                            <path fill="#8f9eb6" d="M81.714,28.306l-0.001,0L71.092,38.926c-1.423,1.423-3.729,1.423-5.152,0l-4.857-4.857c-1.423-1.423-1.423-3.729,0-5.152l10.624-10.624l0-0.001c-2.512-1.01-5.305-1.469-8.229-1.229c-8.545,0.701-15.519,7.577-16.386,16.107c-0.309,3.039,0.165,5.929,1.209,8.529L19.09,70.908c-2.764,2.764-2.764,7.245,0,10.009c2.764,2.764,7.245,2.764,10.009,0l29.216-29.214c2.6,1.042,5.49,1.514,8.529,1.202c8.523-0.873,15.391-7.843,16.093-16.382C83.177,33.604,82.72,30.815,81.714,28.306z"></path><path fill="#fefdef" d="M24 73.5A2.5 2.5 0 1 0 24 78.5A2.5 2.5 0 1 0 24 73.5Z"></path><path fill="#1f212b" d="M66.489 49.92c-.253 0-.47-.191-.496-.449-.028-.274.172-.521.446-.548 3.032-.311 5.95-1.677 8.215-3.846.199-.191.516-.183.707.016.19.199.184.516-.016.707-2.425 2.322-5.552 3.784-8.805 4.117C66.523 49.919 66.507 49.92 66.489 49.92zM76.702 44c-.104 0-.207-.031-.296-.097-.223-.164-.271-.477-.107-.699.452-.616.854-1.266 1.195-1.932.127-.247.431-.343.673-.218.246.126.344.428.218.673-.365.714-.796 1.409-1.279 2.068C77.007 43.93 76.855 44 76.702 44zM78.78 40c-.053 0-.106-.009-.159-.026-.262-.088-.402-.371-.314-.633.105-.316.2-.638.281-.963.067-.267.338-.43.607-.363.268.067.43.34.363.607-.089.351-.189.697-.305 1.037C79.184 39.868 78.989 40 78.78 40zM49.5 45.949c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l1-1c.195-.195.512-.195.707 0s.195.512 0 .707l-1 1C49.756 45.9 49.628 45.949 49.5 45.949zM46.5 48.948c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l1.5-1.5c.195-.195.512-.195.707 0s.195.512 0 .707l-1.5 1.5C46.756 48.899 46.628 48.948 46.5 48.948zM29.5 65.942c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l15.5-15.495c.195-.195.512-.195.707 0s.195.512 0 .707l-15.5 15.495C29.756 65.894 29.628 65.942 29.5 65.942z"></path><g><path fill="#1f212b" d="M24.095,83.986c-2.068,0-4.137-0.788-5.712-2.362c-3.149-3.149-3.149-8.273,0-11.423l28.754-28.752c-0.98-2.7-1.33-5.517-1.039-8.381c0.911-8.959,8.349-16.268,17.3-17.003c3.002-0.244,5.925,0.19,8.684,1.298c0.259,0.104,0.463,0.312,0.562,0.573c0.1,0.261,0.085,0.552-0.04,0.802c-0.048,0.096-0.112,0.186-0.188,0.262L61.79,29.624c-1.03,1.03-1.03,2.708,0,3.738l4.857,4.856c0.998,0.998,2.739,0.998,3.737,0l10.621-10.62c0.238-0.238,0.585-0.339,0.908-0.272c0.329,0.067,0.604,0.296,0.729,0.607c1.104,2.755,1.538,5.673,1.292,8.672c-0.735,8.942-8.039,16.378-16.988,17.295c-2.863,0.294-5.681-0.054-8.382-1.032L29.807,81.624C28.232,83.198,26.164,83.986,24.095,83.986z M65.016,17.999c-0.482,0-0.967,0.021-1.454,0.061c-8.007,0.656-14.659,7.196-15.474,15.211c-0.28,2.76,0.104,5.47,1.142,8.055c0.149,0.372,0.062,0.797-0.221,1.08l-29.212,29.21c-2.369,2.369-2.369,6.226,0,8.595c2.371,2.37,6.227,2.368,8.596,0l29.216-29.214c0.283-0.283,0.707-0.371,1.079-0.221c2.585,1.036,5.293,1.419,8.056,1.135c8.006-0.82,14.54-7.47,15.197-15.469c0.179-2.162-0.039-4.276-0.645-6.304l-9.497,9.495c-0.876,0.877-2.042,1.36-3.282,1.36s-2.406-0.483-3.283-1.36l-4.857-4.856c-1.811-1.811-1.811-4.756,0-6.566l9.501-9.501C68.303,18.236,66.677,17.999,65.016,17.999z"></path></g><g><path fill="#1f212b" d="M24,79c-1.654,0-3-1.346-3-3s1.346-3,3-3s3,1.346,3,3S25.654,79,24,79z M24,74c-1.103,0-2,0.897-2,2s0.897,2,2,2s2-0.897,2-2S25.103,74,24,74z"></path></g>
                        </svg>
                    ),
                    styleRound: "ml-8 bg-gray-700 text-red-400 text-4xl font-medium px-2.5 py-0.5 rounded-full border border-red-400",
                    title: 'Developer'
                    // hidePercentage: true
                }}
            />
        )
        .setStyle(styles.root);

    const pngBuildStart = performance.now();
    builder
        .build({
            debug: false
        })
        .then((data) => {
            const pngBuildEnd = performance.now();
            console.log(`PNG Build Time: ${(pngBuildEnd - pngBuildStart).toFixed(2)}ms`);
            writeFileSync(`${__dirname}/jsx/test2.png`, data);
        });

    const svgBuildStart = performance.now();
    builder
        .build({
            format: 'svg'
        })
        .then((data) => {
            const svgBuildEnd = performance.now();
            console.log(`SVG Build Time: ${(svgBuildEnd - svgBuildStart).toFixed(2)}ms`);
            writeFileSync(`${__dirname}/jsx/test2.svg`, data);
        });
}

main();
